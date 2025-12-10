import React from "react";
import useRole from "../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyLessons = () => {
  const { isPremium } = useRole();
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/lessons`);
      console.log(res.data.result);
      return res.data.result;
    },
  });
  return (
    <div className="overflow-x-auto w-full p-4">
      <table className="min-w-full bg-white border rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-sm font-semibold"></th>
            <th className="p-3 text-left text-sm font-semibold">Title</th>
            <th className="p-3 text-left text-sm font-semibold">Visibility</th>
            <th className="p-3 text-left text-sm font-semibold">
              Access Level
            </th>
            <th className="p-3 text-left text-sm font-semibold">
              Stats & Actions
            </th>
            {/* <th className="p-3 text-left text-sm font-semibold">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, idx) => (
            <tr
              key={lesson._id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 text-sm">{idx + 1}</td>
              <td className="p-3 text-sm">{lesson.title}</td>

              {/* Visibility Toggle */}
              <td className="p-3 text-sm">
                <button
                  // onClick={() => toggleVisibility(lesson)}
                  className={`px-2 py-1 rounded text-white ${
                    lesson.isPublic ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {lesson.isPublic ? "Public" : "Private"}
                </button>
              </td>

              {/* Access Level */}
              <td className="p-3 text-sm">
                <select
                  value={lesson.accessLevel}
                  // onChange={(e) => changeAccessLevel(lesson, e.target.value)}
                  className={`p-1 border rounded ${
                    !isPremium ? "cursor-not-allowed opacity-60" : ""
                  }`}
                  disabled={!isPremium}
                  title={
                    !isPremium
                      ? "Upgrade to Premium to change access level"
                      : ""
                  }
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </td>

              {/* Stats */}
              <td className="p-3 text-sm flex flex-col gap-1">
                <span>
                  Created: {new Date(lesson.createdAt).toLocaleDateString()}
                </span>
                <span>Reactions: {lesson.likes.length || 0}</span>
                <span>Favorites: {lesson.favorites.length || 0}</span>
              </td>
              {/* Actions */}
              <td className="p-3 text-sm flex flex-wrap gap-2">
                <button
                  // onClick={() => handleUpdateClick(lesson)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  // onClick={() => handleDelete(lesson._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => alert("View Details")}
                  className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLessons;
