import React from "react";
import toast from "react-hot-toast";
import { FaLock, FaStar, FaUserCircle, FaHeart, FaBookmark, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { motion } from "framer-motion";

const LessonCard = ({ lesson }) => {
  const { isPremium, roleLoading } = useRole();
  const navigate = useNavigate(null);
  const isLocked = lesson.accessLevel === "premium" && !isPremium;
  
  const handelLesson = () => {
    if (isLocked) {
      toast.error("Please Upgrade to Premium");
      navigate("/upgrade");
    } else {
      navigate(`/lessons/${lesson._id}`);
    }
  };

  if (roleLoading) return <LoadingSpinner />;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative h-full"
    >
      {/* Card */}
      <div
        className={`${
          isLocked ? "filter blur-sm" : ""
        } bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 overflow-hidden h-full flex flex-col group`}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 border-b border-base-300">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1 mr-2">
              {lesson.title}
            </h3>
            {lesson.accessLevel === "premium" && (
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="flex items-center bg-gradient-to-r from-warning to-warning/80 text-warning-content text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex-shrink-0"
              >
                <FaStar className="mr-1" />
                Premium
              </motion.span>
            )}
          </div>

          {/* Category & Tone Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
              📂 {lesson.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
              🎭 {lesson.emotionalTone}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Description */}
          <p className="text-base-content/80 mb-4 line-clamp-3 flex-1 leading-relaxed">
            {lesson.description}
          </p>

          {/* Creator Info */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-base-200/50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <FaUserCircle className="text-primary w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base-content font-semibold truncate">
                  {lesson.creator.name}
                </span>
                {lesson.creator.isPremium && (
                  <span className="text-warning font-bold text-sm flex-shrink-0">⭐</span>
                )}
              </div>
              <p className="text-xs text-base-content/60">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 p-3 bg-base-200/30 rounded-xl">
            <div className="flex items-center gap-4 text-sm text-base-content/70">
              <div className="flex items-center gap-1">
                <FaHeart className="text-error w-3 h-3" />
                <span>{lesson.likes?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaBookmark className="text-info w-3 h-3" />
                <span>{lesson.favorites?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaEye className="text-success w-3 h-3" />
                <span>{lesson.views || 0}</span>
              </div>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              lesson.accessLevel === "premium"
                ? "bg-warning/20 text-warning border border-warning/30"
                : "bg-success/20 text-success border border-success/30"
            }`}>
              {lesson.accessLevel === "premium" ? "💎 Premium" : "🆓 Free"}
            </span>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handelLesson}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-content font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaEye className="w-4 h-4" />
            View Lesson Details
          </motion.button>
        </div>
      </div>

      {/* Lock overlay for non-premium users */}
      {isLocked && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white rounded-2xl pointer-events-none"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-center"
          >
            <FaLock size={40} className="mb-4 text-warning" />
            <h4 className="text-xl font-bold mb-2">Premium Content</h4>
            <p className="text-center font-medium text-white/90 mb-4">
              Upgrade to Premium to unlock this lesson
            </p>
            <div className="bg-gradient-to-r from-warning to-warning/80 text-warning-content px-4 py-2 rounded-full text-sm font-semibold">
              💎 Premium Required
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LessonCard;
