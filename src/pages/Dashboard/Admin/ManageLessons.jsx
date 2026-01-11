import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { customToast } from "../../../utils/customToast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

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
      confirmButtonColor: "#BC6C25",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${id}`).then((res) => {
          if (res.data.result.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Lesson has been deleted successfully.",
              icon: "success",
              background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
              color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
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
          customToast.success(`Lesson ${!current ? 'featured' : 'unfeatured'} successfully! ⭐`);
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
          customToast.success(`Lesson marked as ${!current ? 'reviewed' : 'unreviewed'}! ✅`);
          refetch();
        }
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-base-content">
                📚 Manage Lessons
              </h1>
              <p className="text-base-content/70 mt-1">
                Review, moderate and manage all lessons
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <StatCard 
            title="Public Lessons" 
            value={publicCount} 
            icon="🌍"
            color="success"
            delay={0.1}
          />
          <StatCard 
            title="Private Lessons" 
            value={privateCount} 
            icon="🔒"
            color="warning"
            delay={0.2}
          />
          <StatCard 
            title="Reported Lessons" 
            value={reportsCount} 
            icon="⚠️"
            color="error"
            delay={0.3}
          />
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-info/10 rounded-lg">
              <svg className="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-base-content">Filter Lessons</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content/70">Category</label>
              <select
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full p-3 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
              >
                <option value="">All Categories</option>
                <option value="Personal Growth">🌱 Personal Growth</option>
                <option value="Career">💼 Career</option>
                <option value="Relationships">❤️ Relationships</option>
                <option value="Mindset">🧠 Mindset</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content/70">Visibility</label>
              <select
                onChange={(e) => setFilters({ ...filters, visibility: e.target.value })}
                className="w-full p-3 border-2 border-base-300 rounded-xl focus:border-secondary focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
              >
                <option value="">All Visibility</option>
                <option value="public">🌍 Public</option>
                <option value="private">🔒 Private</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content/70">Reports</label>
              <select
                onChange={(e) => setFilters({ ...filters, reports: e.target.value })}
                className="w-full p-3 border-2 border-base-300 rounded-xl focus:border-warning focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
              >
                <option value="">All Lessons</option>
                <option value="true">⚠️ Reports Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Lessons Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">Lessons Management</h3>
                <p className="text-base-content/70 text-sm">Total: {lessons.length} lessons</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content hidden md:table-cell">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Visibility</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content hidden lg:table-cell">Creator</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-base-content">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-base-300">
                {lessons.length > 0 ? lessons.map((lesson, index) => (
                  <motion.tr
                    key={lesson._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="hover:bg-base-200/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-base-content">{lesson.title}</div>
                      <div className="text-sm text-base-content/70">ID: {lesson._id?.slice(-8)}</div>
                    </td>

                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                        {lesson.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        lesson.visibility === 'public' 
                          ? 'bg-success/10 text-success border border-success/20' 
                          : 'bg-warning/10 text-warning border border-warning/20'
                      }`}>
                        {lesson.visibility === 'public' ? '🌍' : '🔒'} {lesson.visibility}
                      </span>
                    </td>

                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-base-content">{lesson.creator?.email}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {lesson.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-info/10 text-info border border-info/20 block">
                            ⭐ Featured
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium block ${
                          lesson.reviewed 
                            ? 'bg-success/10 text-success border border-success/20' 
                            : 'bg-error/10 text-error border border-error/20'
                        }`}>
                          {lesson.reviewed ? '✅ Reviewed' : '❌ Not Reviewed'}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleFeatured(lesson._id, lesson.featured)}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-info/10 text-info border border-info/20 hover:bg-info/20 transition-all duration-200"
                        >
                          {lesson.featured ? "Unfeature" : "Feature"}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markReviewed(lesson._id, lesson.reviewed)}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-all duration-200"
                        >
                          {lesson.reviewed ? "Unreview" : "Review"}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(lesson._id)}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-error/10 text-error border border-error/20 hover:bg-error/20 transition-all duration-200"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold text-base-content mb-2">No Lessons Found</h3>
                      <p className="text-base-content/70">Try adjusting your filters to see more results</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, color, delay }) => {
  const getColorClasses = () => {
    switch (color) {
      case "success": return "from-success/10 to-success/5 border-success/20 text-success";
      case "warning": return "from-warning/10 to-warning/5 border-warning/20 text-warning";
      case "error": return "from-error/10 to-error/5 border-error/20 text-error";
      default: return "from-primary/10 to-primary/5 border-primary/20 text-primary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${getColorClasses()} rounded-2xl p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-base-content/70 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${getColorClasses().split(' ')[3]}`}>{value}</p>
    </motion.div>
  );
};

export default ManageLessons;
