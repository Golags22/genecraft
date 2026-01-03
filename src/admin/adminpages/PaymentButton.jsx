import React, { useState } from 'react';
import { auth } from '../../../database/firebase';

export default function PaymentButton({ course, userId }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    if (!course || !userId) return;

    setIsProcessing(true);

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY, // ✅ ENV
      tx_ref: `${Date.now()}-${userId}-${course.id}`,
      amount: course.price,
      //You can change the currency here
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

      callback: function () {
        // ✅ DO NOTHING
        // Webhook handles verification + unlock
        setIsProcessing(false);
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
      className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
    >
      {isProcessing ? 'Processing...' : `Buy Course $${course.price}`}
    </button>
  );
}
