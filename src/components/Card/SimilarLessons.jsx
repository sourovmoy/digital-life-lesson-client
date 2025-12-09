import { useQuery } from "@tanstack/react-query";

import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const SimilarLessons = ({ category }) => {
  const axios = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["category", category],
    enabled: !!category,
    queryFn: async () => {
      const res = await axios.get(`/lessons?category=${category}`);

      return res.data.result || [];
    },
  });


  return (
    <div>
      {data.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">
            Similar Lessons in {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.slice(0, 6).map((item) => (
              <Link
                to={`/lessons/${item._id}`}
                key={item._id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition hover:bg-lime-200"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.emotionalTone}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarLessons;
