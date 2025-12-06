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
      <h1 className="text-4xl font-bold text-center mb-10">
        Upgrade to Premium ⭐
      </h1>

      {!isPremium ? (
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Free vs Premium</h2>

          <table className="w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3">Free</th>
                <th className="p-3">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Create Unlimited Lessons</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Upload Premium Lessons</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Access Premium Public Lessons</td>
                <td className="p-3 blur-sm">Locked 🔒</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Ad-free Experience</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Priority Listing</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>

              <tr>
                <td className="p-3">Lifetime Access</td>
                <td className="p-3">❌</td>
                <td className="p-3">✔️</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10 text-center">
            <button
              onClick={handleCheckout}
              className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700"
            >
              Upgrade to Premium — ৳1500 (Lifetime)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-green-600">
          You are already a Premium user! ⭐
        </div>
      )}
    </div>
  );
};

export default PricingPage;
