import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useRole from "../../hooks/useRole";
import { FaBookmark, FaFlag, FaHeart, FaUserCircle, FaEye, FaClock, FaCalendar, FaShare, FaTimes } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CommentsSection from "../Comments/CommentsSection";
import SimilarLessons from "./SimilarLessons";
import SimilarTones from "./SimilarTones";
import { motion } from "framer-motion";

const LessonDetails = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();
  const { isPremium, roleLoading } = useRole();
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  
  const {
    data: lesson = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["lesson", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosInstance.get(`/lessons/${id}`);
      return res.data.result;
    },
  });
  
  const isLocked = lesson?.accessLevel === "premium" && !isPremium;
  const save = lesson?.favorites?.includes(user?.email);
  const like = lesson?.likes?.includes(user?.email);

  //likes
  const handleLike = async () => {
    if (!user) {
      toast.error("Login First");
      navigate("/login");
    }
    await axiosInstance.patch(`/lesson/${id}/likes`).then(() => {
      refetch();
    });
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
  
  // report
  const handleReport = (reason) => {
    const updateReport = {
      name: user?.displayName,
      email: user?.email,
      reason,
      timestamp: new Date(),
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You want to report this lesson",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BC6C25",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, report it!",
      background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/report/${lesson?._id}`, updateReport)
          .then((res) => {
            if (res.data.result.modifiedCount) {
              Swal.fire({
                title: "Reported!",
                text: "Your report has been submitted successfully.",
                icon: "success",
                background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
                color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
              });
              setShowReportModal(false);
            }
          });
      }
    });
  };

  const handelSave = async (id) => {
    if (!user) {
      toast.error("Login First");
      navigate("/login");
      return;
    }
    axiosInstance.patch(`/lesson/${id}/favorites`).then((res) => {
      if (res.data.result.modifiedCount) {
        refetch();
        toast.success(save ? "Removed from favorites" : "Added to favorites");
      }
    });
  };

  if (isLoading || roleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200"
    >
      <Container className="px-4 sm:px-6 lg:px-8 py-8">
        {/* UNLOCKED CONTENT */}
        {!isLocked && (
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden mb-8"
            >
              {/* Hero Header */}
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 leading-tight">
                      {lesson?.title}
                    </h1>
                    
                    {/* Category + Tone Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold"
                      >
                        📂 {lesson?.category}
                      </motion.span>
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/30 font-semibold"
                      >
                        🎭 {lesson?.emotionalTone}
                      </motion.span>
                      {lesson?.accessLevel === "premium" && (
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center px-4 py-2 rounded-full bg-warning/20 text-warning border border-warning/30 font-semibold"
                        >
                          💎 Premium
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 text-center border border-base-300">
                    <div className="text-2xl font-bold text-error">{lesson?.likes?.length || 0}</div>
                    <div className="text-sm text-base-content/70">Likes</div>
                  </div>
                  <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 text-center border border-base-300">
                    <div className="text-2xl font-bold text-info">{lesson?.favorites?.length || 0}</div>
                    <div className="text-sm text-base-content/70">Saves</div>
                  </div>
                  <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 text-center border border-base-300">
                    <div className="text-2xl font-bold text-success">{Math.floor(Math.random() * 1000) + 100}</div>
                    <div className="text-sm text-base-content/70">Views</div>
                  </div>
                  <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-4 text-center border border-base-300">
                    <div className="text-2xl font-bold text-accent">{lesson?.comments?.length || 0}</div>
                    <div className="text-sm text-base-content/70">Comments</div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Description */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold text-base-content mb-4">📖 Lesson Content</h2>
                  <div className="bg-base-200/50 rounded-2xl p-6 border border-base-300">
                    <p className="text-base-content/80 leading-relaxed text-lg">
                      {lesson?.description}
                    </p>
                  </div>
                </motion.div>

                {/* Metadata */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-base-content mb-4">📊 Lesson Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-base-200/50 rounded-xl p-4 border border-base-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaCalendar className="text-primary" />
                        <span className="font-semibold text-base-content">Created</span>
                      </div>
                      <p className="text-base-content/70">
                        {new Date(lesson?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-base-200/50 rounded-xl p-4 border border-base-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaClock className="text-secondary" />
                        <span className="font-semibold text-base-content">Updated</span>
                      </div>
                      <p className="text-base-content/70">
                        {lesson?.updatedAt
                          ? new Date(lesson?.updatedAt).toLocaleDateString()
                          : "Not updated"}
                      </p>
                    </div>
                    <div className="bg-base-200/50 rounded-xl p-4 border border-base-300">
                      <div className="flex items-center gap-3 mb-2">
                        <FaEye className="text-accent" />
                        <span className="font-semibold text-base-content">Visibility</span>
                      </div>
                      <p className="text-base-content/70 capitalize">{lesson?.visibility}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Creator Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold text-base-content mb-4">👤 About the Creator</h3>
                  <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-base-300">
                    <div className="flex items-center gap-4 mb-4">
                      {lesson?.creator?.photoURL ? (
                        <img
                          src={lesson?.creator?.photoURL}
                          alt={lesson?.creator?.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-base-300 shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center">
                          <FaUserCircle className="text-3xl text-base-content/50" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-base-content">{lesson?.creator?.name}</h4>
                        <p className="text-base-content/70">
                          📚 {totalLesson?.length} lessons created
                        </p>
                        {lesson?.creator?.isPremium && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-warning/20 text-warning text-sm font-medium mt-1">
                            ⭐ Premium Creator
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      to={"/dashboard/profile"}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
                    >
                      View all lessons by this author
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                      like 
                        ? 'bg-error text-error-content' 
                        : 'bg-error/10 text-error border border-error/30 hover:bg-error hover:text-error-content'
                    }`}
                  >
                    <FaHeart />
                    {like ? "Unlike" : "Like"} ({lesson?.likes?.length || 0})
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handelSave(lesson?._id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                      save 
                        ? 'bg-info text-info-content' 
                        : 'bg-info/10 text-info border border-info/30 hover:bg-info hover:text-info-content'
                    }`}
                  >
                    <FaBookmark />
                    {save ? "Saved" : "Save"} ({lesson?.favorites?.length || 0})
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold bg-success/10 text-success border border-success/30 hover:bg-success hover:text-success-content transition-all duration-300 shadow-lg"
                  >
                    <FaShare />
                    Share
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl font-semibold bg-warning/10 text-warning border border-warning/30 hover:bg-warning hover:text-warning-content transition-all duration-300 shadow-lg"
                  >
                    <FaFlag />
                    Report
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <CommentsSection
                lessonId={lesson?._id}
                comments={lesson.comments}
                refetchLesson={refetch}
              />
            </motion.div>

            {/* Similar Lessons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8"
            >
              <SimilarLessons category={lesson.category} />
            </motion.div>

            {/* Similar Tones */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <SimilarTones tone={lesson.emotionalTone} />
            </motion.div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-base-content">Share this lesson</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-base-content/70" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FacebookShareButton url={window.location.href} className="w-full">
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors w-full">
                      <FacebookIcon size={32} round />
                      <span className="font-medium text-base-content">Facebook</span>
                    </div>
                  </FacebookShareButton>

                  <TwitterShareButton url={window.location.href} className="w-full">
                    <div className="flex items-center gap-3 p-3 bg-sky-500/10 hover:bg-sky-500/20 rounded-xl transition-colors w-full">
                      <TwitterIcon size={32} round />
                      <span className="font-medium text-base-content">Twitter</span>
                    </div>
                  </TwitterShareButton>

                  <WhatsappShareButton url={window.location.href} className="w-full">
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors w-full">
                      <WhatsappIcon size={32} round />
                      <span className="font-medium text-base-content">WhatsApp</span>
                    </div>
                  </WhatsappShareButton>

                  <LinkedinShareButton url={window.location.href} className="w-full">
                    <div className="flex items-center gap-3 p-3 bg-blue-600/10 hover:bg-blue-600/20 rounded-xl transition-colors w-full">
                      <LinkedinIcon size={32} round />
                      <span className="font-medium text-base-content">LinkedIn</span>
                    </div>
                  </LinkedinShareButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-base-content">Report Lesson</h3>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-base-content/70" />
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    "Inappropriate Content",
                    "Hate Speech",
                    "Misleading Information",
                    "Spam",
                    "Disturbing Content",
                    "Other",
                  ].map((reason) => (
                    <motion.button
                      key={reason}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleReport(reason)}
                      className="block w-full text-left p-4 hover:bg-base-200 rounded-xl transition-colors border border-base-300"
                    >
                      <span className="font-medium text-base-content">{reason}</span>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setShowReportModal(false)}
                  className="mt-6 w-full px-4 py-3 bg-base-200 hover:bg-base-300 rounded-xl text-base-content font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </motion.div>
  );
};

export default LessonDetails;
