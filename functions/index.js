const { onRequest } = require("firebase-functions/v2/https");
const { defineString } = require("firebase-functions/params");
const crypto = require("crypto"); // Added for HMAC verification
const admin = require("firebase-admin");
const axios = require("axios");

// ==================== INITIALIZATION ====================
try {
  admin.initializeApp();
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase initialization error:", error);
  }
}

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// ==================== CONFIGURATION ====================
const FLW_SECRET_KEY = defineString("FLW_SECRET_KEY");
const FLW_SECRET_HASH = defineString("FLW_SECRET_HASH"); // Webhook secret hash

// Production constants
const CONFIG = {
  FLUTTERWAVE_API_TIMEOUT: 15000,
  FUNCTION_TIMEOUT: 30,
  MAX_INSTANCES: 10,
  MIN_INSTANCES: 0,
};

// ==================== SECURITY UTILITIES ====================
class SecurityUtils {
  /**
   * Verify Flutterwave webhook signature using HMAC-SHA256
   * According to Flutterwave docs: https://developer.flutterwave.com/docs/events/webhooks
   */
  static verifySignature(rawBody, signature, secretHash) {
    try {
      const hash = crypto
        .createHmac("sha256", secretHash)
        .update(rawBody)
        .digest("base64");
      
      console.log("🔐 Signature Verification:", {
        receivedSignature: signature,
        computedSignature: hash,
        match: hash === signature
      });
      
      return hash === signature;
    } catch (error) {
      console.error("Signature verification error:", error);
      return false;
    }
  }

  /**
   * Validate webhook payload structure
   */
  static validateWebhookPayload(payload) {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid payload: Not an object");
    }

    // Check required fields
    if (!payload.type) {
      throw new Error("Missing event type");
    }

    if (!payload.data || typeof payload.data !== "object") {
      throw new Error("Missing or invalid data field");
    }

    // Only process charge.completed events
    if (payload.type !== "charge.completed") {
      throw new Error(`Unsupported event type: ${payload.type}`);
    }

    // Check payment status
    if (payload.data.status !== "succeeded") {
      throw new Error(`Payment not successful: ${payload.data.status}`);
    }

    // Check required transaction fields
    const requiredFields = ["id", "tx_ref", "amount", "currency"];
    for (const field of requiredFields) {
      if (!payload.data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    return true;
  }
}

// ==================== PAYMENT PROCESSOR ====================
class PaymentProcessor {
  constructor(secretKey) {
    this.secretKey = secretKey;
    this.axiosInstance = axios.create({
      baseURL: "https://api.flutterwave.com/v3",
      timeout: CONFIG.FLUTTERWAVE_API_TIMEOUT,
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Verify transaction with Flutterwave API
   */
  async verifyTransaction(transactionId) {
    try {
      console.log(`🔍 Verifying transaction: ${transactionId}`);
      
      const response = await this.axiosInstance.get(`/transactions/${transactionId}/verify`);
      
      console.log("📊 Verification response:", {
        status: response.data.status,
        transactionStatus: response.data.data?.status,
        message: response.data.message
      });

      if (response.data.status !== "success" || response.data.data?.status !== "successful") {
        throw new Error(`Verification failed: ${response.data.message}`);
      }

      return response.data;
    } catch (error) {
      console.error("❌ Transaction verification error:", error.message);
      throw new Error(`Transaction verification failed: ${error.message}`);
    }
  }

  /**
   * Extract and sanitize transaction data
   */
  static extractTransactionData(payload) {
    const { id, tx_ref, amount, currency, meta, customer } = payload.data;
    
    // Parse meta data - Flutterwave stores meta as object, not nested
    const userId = meta?.userId || customer?.id || `user_${Date.now()}`;
    const courseId = meta?.courseId || "unknown_course";
    
    return {
      transactionId: id,
      transactionRef: tx_ref,
      amount: parseFloat(amount),
      currency: currency.toUpperCase(),
      userId: userId.toString(),
      courseId: courseId.toString(),
      customerEmail: customer?.email || "",
      customerName: customer?.name || "",
      customerPhone: customer?.phone_number || "",
      rawMeta: meta || {},
      rawCustomer: customer || {},
      isLive: payload.data.status === "succeeded",
    };
  }
}

// ==================== FIRESTORE MANAGER ====================
class FirestoreManager {
  constructor(db) {
    this.db = db;
  }

  /**
   * Check if transaction already processed
   */
  async checkDuplicateTransaction(transactionId) {
    const txDoc = await this.db.collection("transactions").doc(transactionId).get();
    return txDoc.exists ? txDoc.data() : null;
  }

  /**
   * Save transaction with batch operation
   */
  async saveTransaction(transactionData, userData) {
    const batch = this.db.batch();
    const serverTimestamp = FieldValue.serverTimestamp();
    const timestamp = new Date().toISOString();

    // 1. Save transaction
    const txRef = this.db.collection("transactions").doc(transactionData.transactionId);
    batch.set(txRef, {
      ...transactionData,
      status: "completed",
      webhookReceivedAt: timestamp,
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
    });

    // 2. Update or create user
    const userRef = this.db.collection("users").doc(transactionData.userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      // Update existing user
      batch.update(userRef, {
        purchasedCourses: FieldValue.arrayUnion(transactionData.courseId),
        updatedAt: serverTimestamp,
        lastPaymentAt: serverTimestamp,
        totalSpent: FieldValue.increment(transactionData.amount),
      });
    } else {
      // Create new user
      batch.set(userRef, {
        userId: transactionData.userId,
        email: transactionData.customerEmail,
        name: transactionData.customerName,
        phone: transactionData.customerPhone,
        purchasedCourses: [transactionData.courseId],
        totalSpent: transactionData.amount,
        createdAt: serverTimestamp,
        updatedAt: serverTimestamp,
        lastPaymentAt: serverTimestamp,
        status: "active",
      });
    }

    // 3. Create enrollment record
    const enrollmentId = `${transactionData.userId}_${transactionData.courseId}_${transactionData.transactionId}`;
    const enrollmentRef = this.db.collection("enrollments").doc(enrollmentId);
    
    batch.set(enrollmentRef, {
      userId: transactionData.userId,
      courseId: transactionData.courseId,
      transactionId: transactionData.transactionId,
      amount: transactionData.amount,
      currency: transactionData.currency,
      enrolledAt: serverTimestamp,
      status: "active",
      createdAt: serverTimestamp,
    });

    // 4. Create audit log
    const auditRef = this.db.collection("payment_audit_logs").doc(transactionData.transactionId);
    batch.set(auditRef, {
      transactionId: transactionData.transactionId,
      userId: transactionData.userId,
      event: "payment_processed",
      amount: transactionData.amount,
      currency: transactionData.currency,
      processedAt: serverTimestamp,
      source: "flutterwave_webhook",
    });

    // Execute batch
    await batch.commit();
    console.log("✅ All database operations completed");
    
    return {
      transactionId: transactionData.transactionId,
      userId: transactionData.userId,
      courseId: transactionData.courseId,
      savedAt: timestamp,
    };
  }
}

// ==================== MAIN WEBHOOK HANDLER ====================
exports.flutterwaveWebhook = onRequest(
  {
    secrets: [FLW_SECRET_KEY, FLW_SECRET_HASH],
    cors: true,
    timeoutSeconds: CONFIG.FUNCTION_TIMEOUT,
    memory: "256MiB",
    maxInstances: CONFIG.MAX_INSTANCES,
    minInstances: CONFIG.MIN_INSTANCES,
    maxInstancesRequestConcurrency: 80,
    region: "us-central1",
  },
  async (req, res) => {
    const startTime = Date.now();
    let transactionId = null;

    try {
      console.log("🟢 Flutterwave webhook received at:", new Date().toISOString());
      console.log("📝 Request method:", req.method);
      console.log("📋 Headers received:", Object.keys(req.headers));

      // ==================== SECURITY: SIGNATURE VERIFICATION ====================
      const signature = req.headers["flutterwave-signature"];
      const secretHash = FLW_SECRET_HASH.value();

      console.log("🔐 Signature check:", {
        headerPresent: !!signature,
        headerName: "flutterwave-signature",
        headerValue: signature ? `${signature.substring(0, 20)}...` : "MISSING",
        secretHashPresent: !!secretHash,
      });

      if (!signature || !secretHash) {
        console.error("❌ Missing signature or secret hash");
        return res.status(401).json({
          status: "error",
          message: "Unauthorized - missing signature",
          code: "MISSING_SIGNATURE",
        });
      }

      // Verify HMAC signature
      const rawBody = JSON.stringify(req.body);
      const isValid = SecurityUtils.verifySignature(rawBody, signature, secretHash);

      if (!isValid) {
        console.error("❌ Invalid webhook signature");
        return res.status(401).json({
          status: "error",
          message: "Unauthorized - invalid signature",
          code: "INVALID_SIGNATURE",
        });
      }

      console.log("✅ Webhook signature verified successfully");

      // ==================== PAYLOAD VALIDATION ====================
      const payload = req.body;
      SecurityUtils.validateWebhookPayload(payload);

      // ==================== EXTRACT TRANSACTION DATA ====================
      const transactionData = PaymentProcessor.extractTransactionData(payload);
      transactionId = transactionData.transactionId;

      console.log("📦 Processing transaction:", {
        transactionId: transactionData.transactionId,
        amount: transactionData.amount,
        currency: transactionData.currency,
        userId: transactionData.userId,
        courseId: transactionData.courseId,
        eventType: payload.type,
      });

      // ==================== IDEMPOTENCY CHECK ====================
      const firestoreManager = new FirestoreManager(db);
      const existingTransaction = await firestoreManager.checkDuplicateTransaction(transactionId);

      if (existingTransaction) {
        console.log("🔄 Transaction already processed:", {
          transactionId,
          originalProcessedAt: existingTransaction.createdAt,
        });

        return res.status(200).json({
          status: "success",
          message: "Transaction already processed",
          code: "ALREADY_PROCESSED",
          transactionId,
          previouslyProcessedAt: existingTransaction.createdAt,
        });
      }

      // ==================== VERIFY WITH FLUTTERWAVE API ====================
      const secretKey = FLW_SECRET_KEY.value();
      const processor = new PaymentProcessor(secretKey);
      
      let verificationResult;
      if (transactionData.isLive) {
        verificationResult = await processor.verifyTransaction(transactionId);
        console.log("✅ Transaction verified with Flutterwave API");
      } else {
        console.log("⚡ Test transaction - skipping API verification");
        verificationResult = { status: "test_skipped" };
      }

      // ==================== SAVE TO DATABASE ====================
      const savedData = await firestoreManager.saveTransaction(transactionData, verificationResult);
      
      // ==================== SUCCESS RESPONSE ====================
      const processingTime = Date.now() - startTime;

      console.log("🎉 Payment processed successfully:", {
        transactionId,
        userId: transactionData.userId,
        courseId: transactionData.courseId,
        amount: transactionData.amount,
        currency: transactionData.currency,
        processingTime: `${processingTime}ms`,
        isLive: transactionData.isLive,
      });

      return res.status(200).json({
        status: "success",
        message: "Payment processed successfully",
        code: "PAYMENT_PROCESSED",
        data: {
          transactionId,
          userId: transactionData.userId,
          courseId: transactionData.courseId,
          amount: transactionData.amount,
          currency: transactionData.currency,
          processingTime: `${processingTime}ms`,
          enrolledAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      // ==================== ERROR HANDLING ====================
      const processingTime = Date.now() - startTime;
      
      console.error("💥 Payment processing failed:", {
        transactionId,
        error: error.message,
        errorCode: error.code,
        processingTime: `${processingTime}ms`,
        timestamp: new Date().toISOString(),
        requestBody: req.body,
      });

      // Determine appropriate status code
      let statusCode = 500;
      let errorCode = "PROCESSING_ERROR";

      if (error.message.includes("Invalid payload") || error.message.includes("Missing required")) {
        statusCode = 400;
        errorCode = "INVALID_REQUEST";
      } else if (error.message.includes("Unauthorized") || error.message.includes("Invalid signature")) {
        statusCode = 401;
        errorCode = "UNAUTHORIZED";
      } else if (error.message.includes("verification failed")) {
        statusCode = 400;
        errorCode = "VERIFICATION_FAILED";
      }

      return res.status(statusCode).json({
        status: "error",
        message: "Payment processing failed",
        code: errorCode,
        transactionId,
        processingTime: `${processingTime}ms`,
        // Only include error details in non-production
        error: process.env.NODE_ENV === "production" ? undefined : error.message,
      });
    }
  }
);

// ==================== SUPPORTING ENDPOINTS ====================
exports.healthCheck = onRequest(
  {
    cors: true,
    region: "us-central1",
  },
  async (req, res) => {
    try {
      // Test database connection
      await db.collection("_health").doc("check").get();
      
      res.json({
        status: "healthy",
        service: "flutterwave-payment-webhook",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "production",
        version: "1.0.0",
      });
    } catch (error) {
      res.status(503).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error.message,
      });
    }
  }
);