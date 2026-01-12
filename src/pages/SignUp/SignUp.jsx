import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUp = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const password = data.password;
    const email = data.email;

    try {
      setIsCreatingAccount(true);
      setLoadingStep("Creating your account...");

      const result = await createUser(email, password);
      console.log("User created:", result.user.email);
      
      setLoadingStep("Uploading your profile image...");
      
      // Handle image upload
      const image = data.photo[0];
      const formData = new FormData();
      formData.append("image", image);

      const uri = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGEBB_API
      }`;
      
      const imageResponse = await axios.post(uri, formData);
      const photoURL = imageResponse.data.data.display_url;
      console.log("Image uploaded:", photoURL);
      
      setLoadingStep("Setting up your profile...");
      
      // Update Firebase profile
      await updateUserProfile(name, photoURL);
      
      // Wait a moment for the auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingStep("Finalizing your account...");
      
      // Save user data to backend
      const userData = {
        displayName: name,
        photoURL: photoURL,
        email: email,
        role: "user", // Default role
        isPremium: false, // Default premium status
      };

      try {
        await axiosSecure.post("/users", userData);
        console.log("User data saved to backend");
      } catch (backendError) {
        console.log("Backend save error:", backendError);
        // If it's a conflict (user already exists), that's okay
        if (backendError.response?.status !== 409) {
          console.error("Failed to save user to backend:", backendError);
        }
      }

      setLoadingStep("Welcome! Redirecting you...");
      
      toast.success("Account created successfully! Welcome! 🎉");
      
      // Navigate after a short delay to ensure auth state is updated
      setTimeout(() => {
        setIsCreatingAccount(false);
        navigate(from, { replace: true });
      }, 1500);
      
    } catch (err) {
      console.error("Signup error:", err);
      setIsCreatingAccount(false);
      setLoadingStep("");
      toast.error(err.message || "Failed to create account");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsCreatingAccount(true);
      setLoadingStep("Signing in with Google...");
      
      const result = await signInWithGoogle();
      console.log("Google signup successful:", result.user.email);
      
      setLoadingStep("Setting up your account...");
      
      // Save Google user data to backend
      const userData = {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        email: result.user.email,
        role: "user", // Default role
        isPremium: false, // Default premium status
      };

      try {
        await axiosSecure.post("/users", userData);
        console.log("Google user data saved to backend");
      } catch (backendError) {
        console.log("Backend save error:", backendError);
        // If it's a conflict (user already exists), that's okay
        if (backendError.response?.status !== 409) {
          console.error("Failed to save user to backend:", backendError);
        }
      }

      setLoadingStep("Welcome! Redirecting you...");

      toast.success("Account created successfully with Google! 🎉");
      
      // Navigate after a short delay to ensure auth state is updated
      setTimeout(() => {
        setIsCreatingAccount(false);
        navigate(from, { replace: true });
      }, 1500);
      
    } catch (err) {
      console.error("Google signup error:", err);
      setIsCreatingAccount(false);
      setLoadingStep("");
      toast.error(err?.message || "Failed to sign up with Google");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCreatingAccount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-base-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-base-300 p-6 sm:p-8 md:p-10 max-w-md w-full text-center"
            >
              {/* Animated Logo/Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-3xl sm:text-4xl"
                >
                  🚀
                </motion.div>
              </motion.div>

              {/* Loading Text */}
              <motion.h3
                key={loadingStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl font-bold text-base-content mb-4"
              >
                Creating Your Account
              </motion.h3>

              <motion.p
                key={loadingStep + "desc"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base text-base-content/70 mb-6"
              >
                {loadingStep || "Please wait while we set everything up..."}
              </motion.p>

              {/* Progress Animation */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-base-300 rounded-full h-2 sm:h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "easeInOut" }}
                  />
                </div>

                {/* Animated Dots */}
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Fun Facts */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10"
                >
                  <p className="text-xs sm:text-sm text-base-content/60 italic">
                    💡 Did you know? Your profile helps us personalize your learning experience!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center items-center min-h-screen bg-base-100 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col max-w-sm sm:max-w-md w-full p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl bg-base-200 text-base-content shadow-xl border border-base-300"
        >
          <div className="mb-6 sm:mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="my-2 sm:my-3 text-2xl sm:text-3xl md:text-4xl font-bold text-base-content"
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-base-content/70"
            >
              Join our community of learners
            </motion.p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content transition-all duration-200 text-sm sm:text-base"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="photo"
                  className="block mb-2 text-sm font-medium text-base-content"
                >
                  Profile Image
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-base-content/70
                    file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary/10 file:text-primary
                    hover:file:bg-primary/20
                    bg-base-100 border-2 border-dashed border-primary/30 rounded-lg sm:rounded-xl cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                    py-2.5 sm:py-3 px-3 sm:px-4 transition-all duration-200"
                  {...register("photo", { required: "Photo is required" })}
                />
                {errors.photo && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.photo.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-base-content/60">
                  PNG, JPG or JPEG (max 2MB)
                </p>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content transition-all duration-200 text-sm sm:text-base"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a strong password"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg sm:rounded-xl border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content transition-all duration-200 text-sm sm:text-base"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Password must contain 1 uppercase, 1 lowercase, and 6+ characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password.message}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <motion.button
                type="submit"
                disabled={loading || isCreatingAccount}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-content font-bold py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] text-sm sm:text-base flex items-center justify-center"
              >
                {loading || isCreatingAccount ? (
                  <div className="flex items-center gap-2">
                    <TbFidgetSpinner className="animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center pt-4 sm:pt-6 space-x-1"
          >
            <div className="flex-1 h-px bg-base-300"></div>
            <p className="px-2 sm:px-3 text-xs sm:text-sm text-base-content/70">
              Or continue with
            </p>
            <div className="flex-1 h-px bg-base-300"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center space-x-2 sm:space-x-3 border mt-3 sm:mt-4 p-2.5 sm:p-3 md:p-4 border-base-300 rounded-lg sm:rounded-xl cursor-pointer hover:bg-base-300/50 transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ pointerEvents: loading || isCreatingAccount ? 'none' : 'auto' }}
          >
            <FcGoogle size={24} className="sm:w-6 sm:h-6" />
            <p className="font-semibold text-sm sm:text-base">Continue with Google</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="px-2 sm:px-6 text-xs sm:text-sm text-center text-base-content/70 mt-4 sm:mt-6"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              state={from}
              className="hover:underline hover:text-primary text-primary font-semibold transition-colors"
            >
              Sign In
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
