import React, { useState } from 'react';
import { auth, db } from '../../../database/firebase';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function PaymentButton({ course, userId }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (!course || !userId) return;

    setIsProcessing(true);

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: `${Date.now()}-${userId}-${course.id}`,
      amount: course.price,
      currency: 'NGN',
      payment_options: 'card,ussd,mobilemoney',

      customer: {
        email: auth.currentUser?.email || '',
        name: auth.currentUser?.displayName || '',
      },

      meta: {
        userId,
        courseId: course.id,
      },

      callback: async function (paymentData) {
        setIsProcessing(false);

        try {
          // 🔹 Add course to user
          await setDoc(doc(db, "users", userId, "courses", course.id), {
            purchasedAt: serverTimestamp(),
            txRef: paymentData.tx_ref,
          });

          // 🔹 Record transaction
          await setDoc(doc(db, "transactions", paymentData.tx_ref), {
            courseId: course.id,
            userId,
            amount: course.price,
            status: paymentData.status,
            createdAt: serverTimestamp(),
          });

          alert('Payment successful! Your course is now unlocked.');
        } catch (err) {
          console.error("Failed to unlock course:", err);
          alert('Payment successful, but failed to unlock course. Contact support.');
        }
      },

      onclose: function () {
        setIsProcessing(false);
      },

      customizations: {
        title: 'Genecraft',
        description: `Payment for ${course.title}`,
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
    >
      {isProcessing ? 'Processing...' : `Buy Course $${course.price}`}
    </button>
  );
}
