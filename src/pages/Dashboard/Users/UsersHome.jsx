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
  const { role, roleLoading } = useRole();
  const { user, loading } = useAuth();
  const { data: totalCreated = [], isLoading } = useQuery({
    queryKey: ["dashboardHome", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/lessons?email=${user?.email}`);
      return res.data.result;
    },
  });
  console.log(totalCreated);

  if (isLoading || loading || roleLoading) return <LoadingSpinner />;
  if (role === "admin") return <Navigate to={"/dashboard/admin"}></Navigate>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Home</h1>

      {/* Stats */}
      <UserStars totalCreated={totalCreated} />

      <div className="p-6 min-h-screen">
        <UserCharts />
      </div>

      {/* Recently Added Lessons */}
      <RecentlyAdd totalCreated={totalCreated} />
      {/* Quick Shortcuts */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Link
          to={"/dashboard/add-lesson"}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Add Lesson
        </Link>
        <Link
          to={"/dashboard/my-favorites"}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          My Favorites
        </Link>
        <Link
          to={"/dashboard/my-lesson"}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          My Lessons
        </Link>
      </div>
    </div>
  );
};

export default UsersHome;
