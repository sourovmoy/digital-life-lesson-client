import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  const [filters, setFilters] = useState({
    category: "",
    visibility: "",
    reports: "",
  });

  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-lessons", filters],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons", {
        params: filters,
      });
      return res.data.result;
    },
  });

  const publicCount = lessons.filter((l) => l.visibility === "public").length;
  const privateCount = lessons.filter((l) => l.visibility === "private").length;
  const reportsCount = lessons.filter((l) => l.reports?.length > 0).length;

  const handleDelete = async (id) => {
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
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
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

  const toggleFeatured = (id, current) => {
    axiosSecure
      .patch(`/lessons/${id}/featured`, {
        featured: !current,
      })
      .then((res) => {
        if (res.data.result.modifiedCount) {
          toast.success("Featured status updated");
          refetch();
        }
      });
  };

  const markReviewed = (id, current) => {
    axiosSecure
      .patch(`/lessons/${id}`, {
        reviewed: !current,
      })
      .then((res) => {
        if (res.data.result.modifiedCount) {
          toast.success("Marked as reviewed");
          refetch();
        }
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Lessons</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Public Lessons" value={publicCount} />
        <StatCard title="Private Lessons" value={privateCount} />
        <StatCard title="Reported Lessons" value={reportsCount} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <select
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="select select-bordered w-full"
        >
          <option value="">All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, visibility: e.target.value })
          }
          className="select select-bordered w-full"
        >
          <option value="">All Visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, reports: e.target.value })}
          className="select select-bordered w-full"
        >
          <option value="">All Lessons</option>
          <option value="true">Reports Only</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table table-zebra min-w-[900px]">
          <thead>
            <tr>
              <th>Title</th>
              <th className="hidden md:table-cell">Category</th>
              <th>Visibility</th>
              <th className="hidden lg:table-cell">Creator</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td className="font-medium">{lesson.title}</td>

                <td className="hidden md:table-cell">{lesson.category}</td>

                <td>
                  <span className="badge badge-outline">
                    {lesson.visibility}
                  </span>
                </td>

                <td className="hidden lg:table-cell">
                  {lesson.creator?.email}
                </td>

                <td className="space-y-1">
                  {lesson.featured && (
                    <span className="badge badge-warning block">Featured</span>
                  )}
                  {lesson.reviewed ? (
                    <span className="badge badge-success block">Reviewed</span>
                  ) : (
                    <span className="badge badge-error block">
                      Not Reviewed
                    </span>
                  )}
                </td>

                <td>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() =>
                        toggleFeatured(lesson._id, lesson.featured)
                      }
                      className="btn btn-xs btn-info"
                    >
                      {lesson.featured ? "Not featured" : "Feature"}
                    </button>

                    <button
                      onClick={() => markReviewed(lesson._id, lesson.reviewed)}
                      className="btn btn-xs btn-success"
                    >
                      {lesson.reviewed ? "Not Review" : "Review"}
                    </button>

                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-5 text-center">
    <h3 className="text-sm sm:text-base font-semibold text-gray-600">
      {title}
    </h3>
    <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);

export default ManageLessons;
