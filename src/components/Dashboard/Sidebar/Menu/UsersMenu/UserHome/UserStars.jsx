import React from "react";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../../Shared/LoadingSpinner";

const UserStars = ({ totalCreated }) => {
  const axios = useAxiosSecure();
  const { data: totalSaved = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await axios.get(`/lessons?favorites=all`);
      return res.data.result;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-xl font-bold">{totalCreated?.length}</h2>
          <p>Total Lessons Created</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-xl font-bold">{totalSaved.length}</h2>
          <p>Total Saved Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default UserStars;
