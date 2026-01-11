import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("PrivateRoute - User:", user?.email || "No user", "Loading:", loading);
  }, [user, loading]);

  if (loading) {
    console.log("PrivateRoute - Still loading...");
    return <LoadingSpinner />;
  }

  if (!user) {
    console.log("PrivateRoute - No user, redirecting to login");
    toast.error("Please log in first");
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  }
  
  console.log("PrivateRoute - User authenticated, rendering children");
  return <div>{children}</div>;
};

export default PrivateRoute;
