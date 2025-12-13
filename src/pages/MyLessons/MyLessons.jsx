import React, { useState } from "react";
import useRole from "../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import UpdateLessonForm from "./UpdateLessonForm";

const MyLessons = () => {
  const [selected, setSelected] = useState({});
  const { isPremium } = useRole();
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const { data: lessons = [], refetch } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/lessons?email=${user?.email}`);
      return res.data.result;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/lessons/${id}`).then((res) => {
          if (res.data.result.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const update = async (id, update) => {
    const updateData = { ...update, updatedAt: new Date() };
    const res = await axios.patch(`/lessons/${id}`, updateData);
    refetch();
    return res.data.result;
  };
  const handleUpdateClick = (lesson) => {
    setSelected(lesson);
    document.getElementById("updateModal").showModal();
  };
  const changeAccessLevel = (lesson, value) => {
    if (lesson.accessLevel === "free") {
      const data = {
        accessLevel: value,
      };
      update(lesson._id, data);
      toast.success("Only Premium user Can see the lesson");
    } else {
      const data = {
        accessLevel: value,
      };
      update(lesson._id, data);
      toast.success("Everyone can see the lesson");
    }
  };

  const toggleVisibility = (lesson) => {
    if (lesson.visibility === "public") {
      const data = {
        visibility: "private",
      };
      update(lesson._id, data);
      toast.success("Your lessons is marked as private");
    } else {
      const data = {
        visibility: "public",
      };
      update(lesson._id, data);
      toast.success("Your lessons is marked as public");
    }
  };

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
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson, idx) => (
            <tr
              key={lesson._id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 text-sm">{idx + 1}</td>
              <td className="p-3 text-lg font-medium">{lesson.title}</td>

              {/* Visibility Toggle */}
              <td className="p-3 text-sm">
                <button
                  onClick={() => toggleVisibility(lesson)}
                  className={`px-2 py-1 rounded text-white ${
                    lesson.visibility === "public"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {lesson.visibility}
                </button>
              </td>

              {/* Access Level */}
              <td className="p-3 text-sm">
                <select
                  value={lesson.accessLevel}
                  onChange={(e) => changeAccessLevel(lesson, e.target.value)}
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
                <span>
                  Created:{" "}
                  {lesson.updatedAt
                    ? new Date(lesson.updatedAt).toLocaleDateString()
                    : "Not updated yet"}
                </span>
                <span>Like Count: {lesson.likes.length || 0}</span>
                <span>Save: {lesson.favorites.length || 0}</span>
              </td>
              {/* Actions */}
              <td className="p-3 text-sm flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateClick(lesson)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>

                {/* Modal */}
                <dialog
                  id="updateModal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Lesson</h3>
                    {selected && (
                      <UpdateLessonForm
                        lesson={selected}
                        isPremium={isPremium}
                        onUpdate={(data) => update(selected._id, data)}
                      />
                    )}
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <Link
                  to={`/lessons/${lesson?._id}`}
                  className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLessons;
