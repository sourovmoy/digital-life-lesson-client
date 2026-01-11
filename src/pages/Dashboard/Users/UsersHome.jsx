import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UserStars from "../../../components/Dashboard/Sidebar/Menu/UsersMenu/UserHome/UserStars";
import useAuth from "../../../hooks/useAuth";
import RecentlyAdd from "./RecentlyAdd";
import { Link, Navigate } from "react-router";
import useRole from "../../../hooks/useRole";
import UserCharts from "../../../components/Charts/UserCharts";

const UsersHome = () => {
  const axios = useAxiosSecure();
  const { role, isPremium, roleLoading } = useRole();
  const { user, loading } = useAuth();
  // Re-enable dashboard API call
  const { data: totalCreated = [], isLoading } = useQuery({
    queryKey: ["dashboardHome", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      console.log("Making dashboard API call for user:", user?.email);
      const res = await axios.get(`/lessons?email=${user?.email}`);
      console.log("Dashboard API call successful:", res.data);
      return res.data.result;
    },
  });

  if (isLoading || loading || roleLoading) return <LoadingSpinner />;
  if (role === "admin") return <Navigate to={"/dashboard/admin"}></Navigate>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>

      {/* User Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Welcome Back!</h3>
          <p className="text-sm text-base-content">{user?.displayName || user?.email}</p>
          <p className="text-xs text-base-content/70">Role: {role}</p>
        </div>
        
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
          <h3 className="font-semibold text-secondary mb-2">Account Status</h3>
          <p className="text-sm text-base-content">
            {isPremium ? '⭐ Premium User' : '👤 Standard User'}
          </p>
          {!isPremium && (
            <Link to="/upgrade" className="text-xs text-primary hover:underline">
              Upgrade to Premium
            </Link>
          )}
        </div>
        
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <h3 className="font-semibold text-accent mb-2">Quick Stats</h3>
          <p className="text-sm text-base-content">Lessons: {totalCreated.length}</p>
          <p className="text-xs text-base-content/70">Total created by you</p>
        </div>
        
        <div className="bg-neutral/10 border border-neutral/20 rounded-lg p-4">
          <h3 className="font-semibold text-neutral mb-2">Last Activity</h3>
          <p className="text-sm text-base-content">Today</p>
          <p className="text-xs text-base-content/70">Keep learning!</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-base-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <UserCharts />
      </div>

      {/* Stats */}
      <UserStars totalCreated={totalCreated} />

      {/* Recently Added Lessons */}
      <RecentlyAdd totalCreated={totalCreated} />
      
      {/* Quick Shortcuts */}
      <div className="bg-base-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to={"/dashboard/add-lesson"}
            className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            ➕ Add New Lesson
          </Link>
          <Link
            to={"/dashboard/my-favorites"}
            className="px-6 py-3 bg-secondary text-secondary-content rounded-lg hover:bg-secondary/90 transition-colors font-medium"
          >
            ❤️ My Favorites
          </Link>
          <Link
            to={"/dashboard/my-lesson"}
            className="px-6 py-3 bg-accent text-accent-content rounded-lg hover:bg-accent/90 transition-colors font-medium"
          >
            📚 My Lessons
          </Link>
          <Link
            to={"/dashboard/profile"}
            className="px-6 py-3 bg-neutral text-neutral-content rounded-lg hover:bg-neutral/90 transition-colors font-medium"
          >
            👤 Profile Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UsersHome;
