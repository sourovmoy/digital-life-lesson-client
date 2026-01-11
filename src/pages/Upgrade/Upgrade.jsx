// src/pages/PricingPage.jsx
import React from "react";

import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PricingPage = () => {
  const { isPremium } = useRole();
  const axios = useAxiosSecure();

  const handleCheckout = async () => {
    try {
      const res = await axios.post("/create-checkout-session");
      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-base-content">
        Upgrade to Premium ⭐
      </h1>

      {!isPremium ? (
        <div className="bg-base-100 shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-base-content">Free vs Premium</h2>

          <table className="w-full border border-base-300 text-left">
            <thead className="bg-base-200">
              <tr>
                <th className="p-3 text-base-content">Feature</th>
                <th className="p-3 text-base-content">Free</th>
                <th className="p-3 text-base-content">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-base-300">
                <td className="p-3 text-base-content">Create Unlimited Lessons</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b border-base-300">
                <td className="p-3 text-base-content">Upload Premium Lessons</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b border-base-300">
                <td className="p-3 text-base-content">Access Premium Public Lessons</td>
                <td className="p-3 blur-sm">Locked 🔒</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b border-base-300">
                <td className="p-3 text-base-content">Ad-free Experience</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b border-base-300">
                <td className="p-3 text-base-content">Priority Listing</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr>
                <td className="p-3 text-base-content">Lifetime Access</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10 text-center">
            <button
              onClick={handleCheckout}
              className="px-8 py-3 bg-primary text-primary-content text-lg rounded-xl hover:bg-primary/90 transition-colors"
            >
              Upgrade to Premium — ৳1500 (Lifetime)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-success">
          You are already a Premium user! ⭐
        </div>
      )}
    </div>
  );
};

export default PricingPage;
