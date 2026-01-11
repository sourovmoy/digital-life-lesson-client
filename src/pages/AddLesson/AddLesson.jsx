import { useState } from "react";
import { useForm } from "react-hook-form";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { customToast } from "../../utils/customToast";
import Lottie from "lottie-react";
import success from "../../assets/successfully.json";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { motion } from "framer-motion";

const AddLesson = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { isPremium, roleLoading } = useRole();
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const {
      accessLevel,
      category,
      visibility,
      title,
      emotionalTone,
      description,
    } = data;
    const createLessons = {
      title,
      description,
      category,
      emotionalTone,
      visibility,
      accessLevel,
      createdAt: new Date(),
      likes: [],
      favorites: [],
      comments: [],
      reports: [],
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
    };
    await axios.post("/lessons", createLessons).then((res) => {
      if (res.data.result.acknowledged) {
        customToast.success("Lesson Created Successfully! 🎉");
        reset();
        setShowSuccess(true);

        // Hide animation after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    }).catch((error) => {
      console.error("Error creating lesson:", error);
      customToast.error("Failed to create lesson. Please try again.");
    });
  };

  if (roleLoading) return <LoadingSpinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Create a New Lesson
          </h1>
          <p className="text-base-content/70 text-lg">
            Share your knowledge and inspire others with your story
          </p>
        </motion.div>

        {/* Main Form Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden"
        >
          {/* Success Animation Overlay */}
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-base-100/95 flex items-center justify-center rounded-3xl z-50 backdrop-blur-sm"
            >
              <div className="text-center">
                <Lottie animationData={success} loop={false} className="w-64 mx-auto" />
                <h3 className="text-2xl font-bold text-success mt-4">Lesson Created Successfully!</h3>
                <p className="text-base-content/70 mt-2">Your lesson has been published and is now available.</p>
              </div>
            </motion.div>
          )}

          {/* Form Header */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-base-content">Lesson Details</h2>
                <p className="text-sm text-base-content/70">Fill in the information below to create your lesson</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Title Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Lesson Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 bg-base-50 text-base-content placeholder:text-base-content/50"
                  placeholder="Enter an engaging title for your lesson..."
                />
                {errors.title && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.title.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Description Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Full Description / Story
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Minimum 20 characters required",
                    },
                  })}
                  className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 bg-base-50 text-base-content placeholder:text-base-content/50 h-40 resize-none"
                  placeholder="Share your story, lesson, or realization in detail. What did you learn? How did it change you? What advice would you give to others?"
                />
                {errors.description && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.description.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Form Grid - Categories and Settings */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-3"
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Category
                  </label>
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-secondary focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
                  >
                    <option value="">Select Category</option>
                    <option value="Personal Growth">🌱 Personal Growth</option>
                    <option value="Career">💼 Career</option>
                    <option value="Relationships">❤️ Relationships</option>
                    <option value="Mindset">🧠 Mindset</option>
                    <option value="Mistakes Learned">📚 Mistakes Learned</option>
                  </select>
                  {errors.category && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-error text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.category.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Emotional Tone */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="space-y-3"
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Emotional Tone
                  </label>
                  <select
                    {...register("emotionalTone", {
                      required: "Emotional tone is required",
                    })}
                    className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
                  >
                    <option value="">Select Emotional Tone</option>
                    <option value="Motivational">🚀 Motivational</option>
                    <option value="Sad">😢 Sad</option>
                    <option value="Realization">💡 Realization</option>
                    <option value="Gratitude">🙏 Gratitude</option>
                  </select>
                  {errors.emotionalTone && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-error text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.emotionalTone.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Privacy */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="space-y-3"
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                    <svg className="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Privacy
                  </label>
                  <select
                    {...register("visibility", {
                      required: "Privacy selection is required",
                    })}
                    className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-info focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
                  >
                    <option value="">Select Privacy</option>
                    <option value="public">🌍 Public</option>
                    <option value="private">🔒 Private</option>
                  </select>
                  {errors.visibility && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-error text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.visibility.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Access Level */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="space-y-3"
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                    <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Access Level
                    {!isPremium && (
                      <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                        Premium Required
                      </span>
                    )}
                  </label>
                  <select
                    {...register("accessLevel", {
                      required: "Access level is required",
                    })}
                    className={`w-full p-4 border-2 border-base-300 rounded-xl focus:border-warning focus:outline-none transition-all duration-300 bg-base-50 text-base-content ${
                      !isPremium ? "cursor-not-allowed opacity-60" : ""
                    }`}
                    title={
                      !isPremium ? "Upgrade to Premium to create paid lessons" : ""
                    }
                  >
                    <option value="">Select Access</option>
                    <option
                      value="premium"
                      disabled={!isPremium}
                      title={!isPremium ? "Premium feature — requires upgrade" : ""}
                    >
                      💎 Premium
                    </option>
                    <option value="free">🆓 Free</option>
                  </select>
                  {errors.accessLevel && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-error text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.accessLevel.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-content p-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Lesson
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-base-content/50 text-sm">
            💡 Tip: Share authentic experiences and practical insights to create valuable lessons for the community
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddLesson;
