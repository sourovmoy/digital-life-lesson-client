import React from "react";
import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-error/10 via-base-100 to-error/20 p-6">
      <div className="bg-base-100 shadow-xl rounded-3xl p-10 max-w-lg mx-auto text-center border border-base-300">
        {/* Cancel Icon */}
        <div className="flex justify-center">
          <FiXCircle className="text-error w-20 h-20 drop-shadow-md animate-[pop_0.4s_ease-out]" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-base-content mt-6">
          Payment Cancelled
        </h1>

        {/* Subtitle */}
        <p className="text-base-content/70 mt-3 text-lg leading-relaxed">
          Your payment was not completed. If this was a mistake, you can try
          again anytime to unlock the
          <span className="font-semibold text-error">Premium Plan</span>.
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-base-300 w-full my-8"></div>

        {/* Try Again Button */}
        <Link
          to="/upgrade"
          className="block bg-primary hover:bg-secondary transition-all text-primary-content font-medium py-3 rounded-xl shadow-md"
        >
          Try Again
        </Link>

        {/* Back to Dashboard */}
        <Link
          to="/dashboard"
          className="block mt-3 text-primary hover:text-secondary font-medium"
        >
          Go Back to Dashboard
        </Link>

        {/* Extra Note */}
        <p className="text-sm text-base-content/70 mt-4">
          If you believe this was an error,
          <Link className="text-primary font-medium"> contact support</Link>.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
