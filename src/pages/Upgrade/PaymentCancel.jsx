import React from "react";
import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg mx-auto text-center border">
        {/* Cancel Icon */}
        <div className="flex justify-center">
          <FiXCircle className="text-red-600 w-20 h-20 drop-shadow-md animate-[pop_0.4s_ease-out]" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Payment Cancelled
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mt-3 text-lg leading-relaxed">
          Your payment was not completed. If this was a mistake, you can try
          again anytime to unlock the
          <span className="font-semibold text-red-700">Premium Plan</span>.
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-gray-200 w-full my-8"></div>

        {/* Try Again Button */}
        <Link
          to="/upgrade"
          className="block bg-red-600 hover:bg-red-700 transition-all text-white font-medium py-3 rounded-xl shadow-md"
        >
          Try Again
        </Link>

        {/* Back to Dashboard */}
        <Link
          to="/dashboard"
          className="block mt-3 text-red-600 hover:text-red-700 font-medium"
        >
          Go Back to Dashboard
        </Link>

        {/* Extra Note */}
        <p className="text-sm text-gray-500 mt-4">
          If you believe this was an error,
          <Link className="text-red-600 font-medium"> contact support</Link>.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
