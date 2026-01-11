import { useState } from "react";
import useRole from "../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { customToast } from "../../utils/customToast";
import UpdateLessonForm from "./UpdateLessonForm";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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
      confirmButtonColor: "#BC6C25",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/lessons/${id}`).then((res) => {
          if (res.data.result.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
              color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
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
            <div className="p-3 bg-primary/10 rounded-xl">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-base-content">
                My Lessons
              </h1>
              <p className="text-base-content/70 mt-1">
                Manage and track your created lessons
              </p>
            </div>
          </div>
          
          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-base-100 rounded-2xl p-4 shadow-lg border border-base-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{lessons.length}</div>
                  <div className="text-sm text-base-content/70">Total Lessons</div>
                </div>
                <div className="h-8 w-px bg-base-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {lessons.filter(l => l.visibility === 'public').length}
                  </div>
                  <div className="text-sm text-base-content/70">Public</div>
                </div>
                <div className="h-8 w-px bg-base-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {lessons.filter(l => l.accessLevel === 'premium').length}
                  </div>
                  <div className="text-sm text-base-content/70">Premium</div>
                </div>
              </div>
              <Link
                to="/create-lesson"
                className="btn btn-primary btn-sm gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        {lessons.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-20"
          >
            <div className="bg-base-100 rounded-3xl p-12 shadow-xl border border-base-300 max-w-md mx-auto">
              <motion.div 
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-8xl mb-6"
              >
                📝
              </motion.div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                No Lessons Created Yet
              </h3>
              <p className="text-base-content/70 mb-8 leading-relaxed">
                Start sharing your knowledge by creating your first lesson. 
                Help others learn and grow with your expertise!
              </p>
              <Link
                to="/create-lesson"
                className="btn btn-primary btn-lg gap-3 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Lesson
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Lesson Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-base-content/70">
                            ID: {lesson._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleVisibility(lesson)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          lesson.visibility === "public"
                            ? "bg-success/20 text-success border border-success/30"
                            : "bg-warning/20 text-warning border border-warning/30"
                        }`}
                      >
                        {lesson.visibility === "public" ? "🌍 Public" : "🔒 Private"}
                      </motion.button>
                      
                      <select
                        value={lesson.accessLevel}
                        onChange={(e) => changeAccessLevel(lesson, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 ${
                          lesson.accessLevel === "premium"
                            ? "bg-secondary/20 text-secondary border-secondary/30"
                            : "bg-info/20 text-info border-info/30"
                        } ${!isPremium ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                        disabled={!isPremium}
                        title={!isPremium ? "Upgrade to Premium to change access level" : ""}
                      >
                        <option value="free">🆓 Free</option>
                        <option value="premium">💎 Premium</option>
                      </select>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-base-200/50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-primary">{lesson.likes?.length || 0}</div>
                      <div className="text-xs text-base-content/70">Likes</div>
                    </div>
                    <div className="bg-base-200/50 rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-secondary">{lesson.favorites?.length || 0}</div>
                      <div className="text-xs text-base-content/70">Saves</div>
                    </div>
                    <div className="bg-base-200/50 rounded-xl p-3 text-center">
                      <div className="text-xs font-medium text-base-content">Created</div>
                      <div className="text-xs text-base-content/70">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-base-200/50 rounded-xl p-3 text-center">
                      <div className="text-xs font-medium text-base-content">Updated</div>
                      <div className="text-xs text-base-content/70">
                        {lesson.updatedAt 
                          ? new Date(lesson.updatedAt).toLocaleDateString()
                          : "Never"
                        }
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpdateClick(lesson)}
                      className="btn btn-sm btn-primary gap-2 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-sm btn-error gap-2 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="btn btn-sm btn-neutral gap-2 shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Update Modal */}
        <dialog id="updateModal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-base-content">Update Lesson</h3>
            </div>
            
            {selected && (
              <UpdateLessonForm
                lesson={selected}
                isPremium={isPremium}
                onUpdate={(data) => update(selected._id, data)}
              />
            )}
            
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-neutral">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-base-content/50 text-sm">
            💡 Tip: Toggle visibility to control who can see your lessons, and set access levels for premium content
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyLessons;
