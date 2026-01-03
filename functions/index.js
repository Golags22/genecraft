const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

const FLW_SECRET = process.env.FLUTTERWAVE_SECRET; // verify transactions
const FLW_SECRET_HASH = process.env.FLW_SECRET_HASH; // verify webhook signature

exports.flutterwaveWebhook = functions.https.onRequest(async (req, res) => {
  try {
    // Verify secret hash (if set)
    const signature = req.headers['flutterwave-signature'];
    if (FLW_SECRET_HASH) {
      const hash = crypto.createHmac('sha256', FLW_SECRET_HASH)
                         .update(JSON.stringify(req.body))
                         .digest('base64');
      if (hash !== signature) {
        return res.status(401).send('Invalid signature');
      }
    }

    res.status(200).send("Webhook received"); // respond immediately

    const payload = req.body;
    const txRef = payload.data?.tx_ref || payload.data?.id;

    // Verify transaction with Flutterwave
    const verifyRes = await axios.get(`https://api.flutterwave.com/v3/transactions/${txRef}/verify`, {
      headers: { Authorization: `Bearer ${FLW_SECRET}` }
    });

    if (verifyRes.data.status === "success") {
      const { amount, currency, status } = verifyRes.data.data;
      const { userId, courseId } = payload.data.meta;

      // Prevent duplicates
      const existing = await db.collection("transactions").doc(txRef).get();
      if (!existing.exists) {
        await db.collection("transactions").doc(txRef).set({
          userId,
          courseId,
          amount,
          currency,
          status,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Update user's purchased courses
        await db.collection("users").doc(userId).update({
          purchasedCourses: admin.firestore.FieldValue.arrayUnion(courseId)
        });
      }
    }

  } catch (error) {
    console.error("Webhook error:", error);
  }
});
