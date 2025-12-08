import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useRole from "../../hooks/useRole";
import { FaBookmark, FaFlag, FaHeart, FaUserCircle } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const LessonDetails = () => {
  const navigate = useNavigate();
  const { isPremium, roleLoading } = useRole();
  const { user } = useAuth();
  const { id } = useParams();
  const axios = useAxios();
  const axiosInstance = useAxiosSecure();

  const {
    data: lesson = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lesson", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`/lessons/${id}`);
      return res.data.result;
    },
  });
  const isLocked = lesson?.accessLevel === "premium" && !isPremium;

  //likes
  const handleLike = () => {
    if (!user) {
      toast.error("Login First");
      navigate("/login");
    }
    axiosInstance.patch(`lesson/${id}/likes`).then(() => refetch());
  };

  // total lessons by creator
  const { data: totalLesson = [] } = useQuery({
    queryKey: ["totalLesson", lesson?.creator?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/lessons?email=${lesson?.creator?.email}`
      );
      return res.data.result;
    },
  });

  if (isLoading || roleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      {/* UNLOCKED CONTENT */}
      {!isLocked && (
        <>
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {lesson?.title}
          </h1>

          {/* Category + Tone */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 text-xs sm:text-sm">
            <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100 font-medium">
              {lesson?.category}
            </span>
            <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100 font-medium">
              {lesson?.emotionalTone}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-sm sm:text-base">
            {lesson?.description}
          </p>

          {/* Metadata */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-5 rounded-lg mb-8 text-sm sm:text-base">
            <p>
              <strong>Created:</strong>{" "}
              {new Date(lesson?.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {new Date(lesson?.updatedAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Visibility:</strong> {lesson?.visibility}
            </p>
          </div>

          {/* Creator Section */}
          <div className="flex items-center gap-3 mb-8">
            {lesson?.creator?.photoURL ? (
              <img src={lesson?.creator?.photoURL} alt="" />
            ) : (
              <FaUserCircle className="text-4xl sm:text-5xl text-gray-400" />
            )}
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {lesson?.creator?.name}
              </h3>
              <h3>
                Total Lessons Created{" "}
                <span className="text-xl font-medium">
                  {totalLesson?.length}
                </span>
              </h3>
              <Link
                to={"/dashboard/profile"}
                className="underline text-lime-600 dark:text-lime-400 mt-1 text-sm"
              >
                View all lessons by this author →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">
            <span>❤️ {lesson?.likes.length || 0} Likes</span>
            <span>🔖 {lesson?.favoritesCount || 0} Saves</span>
            <span>{Math.floor(Math.random() * 10000)}</span>
          </div>

          {/* Interaction Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
            <button
              onClick={handleLike}
              className="px-4 py-2 bg-red-100 dark:bg-red-700 rounded-lg text-sm sm:text-base"
            >
              {lesson?.likes.length === 0 ? (
                <span className="flex items-center gap-2 justify-center">
                  <FaHeart /> Like
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <FaHeart color="red" /> Like
                </span>
              )}
            </button>

            <button className="px-4 py-2 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center gap-2 text-sm sm:text-base">
              <FaBookmark /> Save
            </button>

            <button className="px-4 py-2 bg-yellow-100 dark:bg-yellow-700 rounded-lg flex items-center gap-2 text-sm sm:text-base">
              <FaFlag /> Report
            </button>

            {/* Share Buttons */}
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>

            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>
          </div>
        </>
      )}

      {/* Report Modal */}
      {/* {showReportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96">
                <h3 className="text-xl font-bold mb-4">Report Lesson</h3>

                {[
                  "Inappropriate Content",
                  "Hate Speech",
                  "Misleading Information",
                  "Spam",
                  "Disturbing Content",
                  "Other",
                ].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleReport(reason)}
                    className="block w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    {reason}
                  </button>
                ))}

                <button
                  onClick={() => setShowReportModal(false)}
                  className="mt-4 px-4 py-2 bg-gray-400 rounded-lg text-white w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          )} */}
    </Container>
  );
};

export default LessonDetails;
