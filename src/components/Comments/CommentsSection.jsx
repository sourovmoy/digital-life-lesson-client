import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CommentsSection = ({ lessonId, comments, refetchLesson }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosSecure();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!user) {
      toast.error("You must be logged in to comment.");
      return navigate("/login");
    }

    setLoading(true);
    const data = {
      comment: commentText,
      name: user?.displayName,
    };
    try {
      await axios.patch(`/lesson/${lessonId}/comments`, data);
      toast.success("Comment added!");
      setCommentText("");
      refetchLesson();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment.");
    }
    setLoading(false);
  };

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold mb-3">
        Comments ({comments?.length || 0})
      </h3>

      {/* Comment form */}
      {user && (
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
            placeholder="Write a comment..."
            rows={3}
          />
          <button
            type="submit"
            className="self-end px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      )}

      {/* Display comments */}
      <div className="space-y-4">
        {comments?.length === 0 && (
          <p className="text-gray-500 text-2xl text-center">No comments yet.</p>
        )}
        {comments?.map((c, idx) => (
          <div
            key={idx}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>{c.name}:</strong> {c.comment}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(c.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
