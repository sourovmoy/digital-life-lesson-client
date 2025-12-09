import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();
  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user-favorites"],
    queryFn: async () => {
      const res = await axios.get(`/lessons?favorites=true`);
      return res.data.result;
    },
  });
  const handelRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/lesson/${id}/favorites`).then((res) => {
          if (res.data.result.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "This lesson is removed from favorite lists.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading || loading) return <LoadingSpinner />;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        My Favorite Lessons
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Emotional Tone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {favorites.map((lesson) => (
              <tr key={lesson._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">
                  {lesson.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {lesson.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {lesson.emotionalTone}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handelRemove(lesson._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Remove
                  </button>
                  <Link
                    to={`/lessons/${lesson._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorites;
