import React from "react";
import toast from "react-hot-toast";
import { FaLock, FaStar, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import useRole from "../../hooks/useRole";

const LessonCard = ({ lesson }) => {
  const { isPremium } = useRole();
  const navigate = useNavigate(null);
  const isLocked = lesson.accessLevel === "premium" && !isPremium;
  const handelLesson = () => {
    if (isLocked) {
      toast.error("Please Upgrade to Premium");
      navigate("/upgrade");
    } else {
      navigate(`/public-lessons/${lesson._id}`);
    }
  };
  return (
    <div className="relative">
      {/* Card */}
      <div
        className={`${
          isLocked ? "filter blur-sm" : ""
        } bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between`}
      >
        {/* Title & Premium Badge */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {lesson.title}
          </h3>
          {lesson.accessLevel === "premium" && (
            <span className="flex items-center bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Premium <FaStar className="ml-1" />
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {lesson.description}
        </p>

        {/* Category & Tone */}
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <p>
            <span className="font-semibold">Category:</span> {lesson.category}
          </p>
          <p>
            <span className="font-semibold">Tone:</span> {lesson.emotionalTone}
          </p>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-1 mb-4">
          <FaUserCircle className="text-gray-400 w-6 h-6" />
          <div className="flex items-center space-x-2">
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {lesson.creator.name}
            </span>
            {lesson.creator.isPremium && (
              <span className="text-yellow-500 font-bold">⭐ Premium</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-500 dark:text-gray-400 text-xs">
          <div className="flex space-x-2 mb-2 sm:mb-0">
            <span
              className={`px-2 py-1 rounded-full font-semibold ${
                lesson.accessLevel === "premium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
              }`}
            >
              {lesson.accessLevel}
            </span>
            <span className="px-2 py-1 rounded-full font-semibold bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </span>
          </div>

          <button
            onClick={handelLesson}
            className="mt-2 sm:mt-0 bg-lime-500 hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            See Details
          </button>
        </div>
      </div>

      {/* Lock overlay for non-premium users */}
      {isLocked && (
        <div className="absolute inset-0 blur-xs bg-opacity-50 flex flex-col items-center justify-center text-white rounded-xl p-6 pointer-events-none">
          <FaLock size={30} className="mb-2" />
          <p className="text-center font-semibold">
            Premium Lesson – Upgrade to view
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonCard;
