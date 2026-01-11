import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

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
      confirmButtonColor: "#BC6C25",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Remove it!",
      background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/lesson/${id}/favorites`).then((res) => {
          if (res.data.result.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "This lesson is removed from favorite lists.",
              icon: "success",
              background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
              color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
            });
          }
        });
      }
    });
  };

  if (isLoading || loading) return <LoadingSpinner />;

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
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-base-content">
                My Favorite Lessons
              </h1>
              <p className="text-base-content/70 mt-1">
                Your curated collection of saved lessons
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
                  <div className="text-2xl font-bold text-primary">{favorites.length}</div>
                  <div className="text-sm text-base-content/70">Total Favorites</div>
                </div>
                <div className="h-8 w-px bg-base-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {new Set(favorites.map(f => f.category)).size}
                  </div>
                  <div className="text-sm text-base-content/70">Categories</div>
                </div>
              </div>
              <Link
                to="/public-lessons"
                className="btn btn-primary btn-sm gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add More
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        {favorites.length === 0 ? (
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
                📚
              </motion.div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                No Favorite Lessons Yet
              </h3>
              <p className="text-base-content/70 mb-8 leading-relaxed">
                Start building your personal library by adding lessons to your favorites. 
                Discover amazing content and save what inspires you!
              </p>
              <Link
                to="/public-lessons"
                className="btn btn-primary btn-lg gap-3 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explore Lessons
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden"
          >
            {/* Table Header */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-base-300">
              <div className="grid grid-cols-12 gap-4 font-semibold text-base-content">
                <div className="col-span-4">Lesson Details</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-3">Emotional Tone</div>
                <div className="col-span-3 text-center">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-base-300">
              {favorites.map((lesson, index) => (
                <motion.div
                  key={lesson._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-4 p-6 hover:bg-base-200/50 transition-all duration-300 group"
                >
                  {/* Lesson Details */}
                  <div className="col-span-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-base-content/70 mt-1">
                          Lesson #{lesson._id?.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2 flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                      {lesson.category}
                    </span>
                  </div>

                  {/* Emotional Tone */}
                  <div className="col-span-3 flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                      <span className="text-sm font-medium text-base-content">
                        {lesson.emotionalTone}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex items-center justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handelRemove(lesson._id)}
                      className="btn btn-sm btn-error gap-2 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="btn btn-sm btn-primary gap-2 shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-base-content/50 text-sm">
            💡 Tip: Click on any lesson to view its full content and continue learning
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyFavorites;