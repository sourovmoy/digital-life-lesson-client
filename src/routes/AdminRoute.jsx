import React from "react";
import useRole from "../hooks/useRole";
import UnauthorizedPage from "../components/Unauthorized/UnauthorizedPage";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  const { loading } = useAuth();

  if (roleLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (role !== "admin") {
    return <UnauthorizedPage />;
  }
  return children;
};

export default AdminRoute;
