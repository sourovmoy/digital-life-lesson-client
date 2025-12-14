import React from "react";
import useRole from "../hooks/useRole";
import UnauthorizedPage from "../components/Unauthorized/UnauthorizedPage";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  console.log(role);

  if (roleLoading && !role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }
  if (role !== "admin") {
    return <UnauthorizedPage />;
  }
  return children;
};

export default AdminRoute;
