import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiCheckCircle } from "react-icons/fi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axios = useAxiosSecure();

  useEffect(() => {
    axios
      .patch(`/session-status?session_id=${sessionId}`)
      .then((res) => console.log(res.data));
  }, [axios, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg mx-auto text-center border">
        {/* Success Icon */}
        <div className="flex justify-center">
          <FiCheckCircle
            className="text-green-600 w-20 h-20 drop-shadow-md animate-[pop_0.4s_ease-out]"
            strokeWidth={2.5}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mt-3 text-lg leading-relaxed">
          Your payment has been verified. You are now upgraded to the{" "}
          <span className="font-semibold text-green-700">Premium Plan</span>.
          Enjoy unlimited access to all features!
        </p>

        {/* Divider */}
        <div className="h-[1px] bg-gray-200 w-full my-8"></div>

        {/* Button */}
        <Link
          to="/dashboard"
          className="block bg-green-600 hover:bg-green-700 transition-all text-white font-medium py-3 rounded-xl shadow-md"
        >
          Go to Dashboard
        </Link>

        {/* Extra Note */}
        <p className="text-sm text-gray-500 mt-4">
          Need help?{" "}
          <Link className="text-green-600 font-medium">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
