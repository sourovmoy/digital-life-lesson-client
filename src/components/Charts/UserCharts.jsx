import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const UserCharts = () => {
  const axios = useAxios();
  const { data = [], isLoading } = useQuery({
    queryKey: ["accessLevelAnalytics"],
    queryFn: async () => {
      const res = await axios.get("/analytics/accessLevel");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No data</div>;

  return (
    <div className="rounded-2xl shadow-md p-4 sm:p-6 w-full min-h-[400px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🎯 Lessons by Access Level (Last 7 Days)
      </h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="accessLevel" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserCharts;
