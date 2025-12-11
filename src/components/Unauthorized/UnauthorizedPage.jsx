import React from "react";

const UnauthorizedPage = () => {
  return (
    <div>
      {" "}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-3xl">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md text-center border border-red-200">
          <h1 className="text-6xl font-bold text-red-500 rounded-2xl">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mt-2">
            You don’t have permission to access this page.
          </p>

          <Link
            to="/"
            className="inline-block mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
