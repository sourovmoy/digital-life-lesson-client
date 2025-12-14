import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminCharts = ({ stats }) => {
  const { mostActiveContributors = [] } = stats || {};

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 sm:p-6">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        📈 Most Active Contributors
      </h2>

      {/* Chart */}
      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mostActiveContributors.slice(0, 10)}
            margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="email"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />

            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />

            <Line
              type="monotone"
              dataKey="lessonCount"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminCharts;
