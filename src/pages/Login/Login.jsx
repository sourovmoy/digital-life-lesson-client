import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // eslint-disable-line
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaUserShield, FaUser, FaCrown } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  // Test Firebase connection
  const testFirebaseConnection = () => {
    console.log("Testing Firebase connection...");
    console.log("Firebase config check:", {
      apiKey: import.meta.env.VITE_apiKey ? "✅ Set" : "❌ Missing",
      authDomain: import.meta.env.VITE_authDomain ? "✅ Set" : "❌ Missing",
      projectId: import.meta.env.VITE_projectId ? "✅ Set" : "❌ Missing",
    });
    
    toast.info("Check browser console for Firebase connection details", {
      duration: 5000,
    });
  };

  // hook form config
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Credential data for quick login
  const credentials = [
    {
      id: 'admin',
      label: 'Login as Admin',
      email: 'recucinex@mailinator.com',
      password: 'recucinex@mailinator.coM', // Note: This looks like it might be wrong - password same as email
      color: '#BC6C25',
      hoverColor: '#D4793A',
      icon: FaUserShield,
      description: 'Full access to admin panel'
    },
    {
      id: 'user',
      label: 'Login as Normal User',
      email: 'suvu@mailinator.com',
      password: 'suvu@mailinator.coM', // Note: This looks like it might be wrong - password same as email
      color: '#DDA15E',
      hoverColor: '#E8B474',
      icon: FaUser,
      description: 'Standard user access'
    },
    {
      id: 'premium',
      label: 'Login as Premium User',
      email: 'bafoxaf@mailinator.com',
      password: 'bafoxaf@mailinator.coM', // Note: This looks like it might be wrong - password same as email
      color: '#283618',
      hoverColor: '#3A4A26',
      icon: FaCrown,
      description: 'Premium features unlocked'
    }
  ];

  // Auto-fill credentials
  const handleCredentialClick = (credential) => {
    setValue('email', credential.email);
    setValue('password', credential.password);
    
    // Add visual feedback to the form fields
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    if (emailField && passwordField) {
      emailField.classList.add('ring-2', 'ring-green-400', 'border-green-400');
      passwordField.classList.add('ring-2', 'ring-green-400', 'border-green-400');
      
      setTimeout(() => {
        emailField.classList.remove('ring-2', 'ring-green-400', 'border-green-400');
        passwordField.classList.remove('ring-2', 'ring-green-400', 'border-green-400');
      }, 2000);
    }
    
    toast.success(`✅ Credentials filled for ${credential.label.replace('Login as ', '')}! Ready to login.`, {
      duration: 3000,
      style: {
        background: credential.color,
        color: 'white',
        fontWeight: '600',
      },
    });
  };

  if (loading) return <LoadingSpinner />;
  const from = location.state || "/dashboard";
  if (user) return <Navigate to={from} replace={true} />;

  // Hook Form Submit Handler
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);
      const result = await signIn(email, password);
      
      // Ensure user exists in backend (for existing Firebase users)
      try {
        const userData = {
          displayName: result.user.displayName || result.user.email.split('@')[0],
          photoURL: result.user.photoURL || '',
          email: result.user.email,
          role: "user",
          isPremium: false,
        };
        
        // Try to create user in backend if they don't exist
        await axiosSecure.post("/users", userData);
        console.log("User ensured in backend");
      } catch (backendError) {
        // If user already exists (409) or other non-critical error, continue
        if (backendError.response?.status === 409) {
          console.log("User already exists in backend");
        } else {
          console.log("Backend user creation failed (non-critical):", backendError.response?.status);
        }
      }
      
      navigate(from, { replace: true });
      toast.success("Login Successful! Welcome back! 🎉");
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      
      // Handle specific Firebase auth errors
      let errorMessage = "Login failed. Please try again.";
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address.";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address format.";
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled.";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      
      // Ensure user exists in backend
      try {
        const userData = {
          displayName: result.user.displayName || result.user.email.split('@')[0],
          photoURL: result.user.photoURL || '',
          email: result.user.email,
          role: "user",
          isPremium: false,
        };
        
        await axiosSecure.post("/users", userData);
        console.log("Google user ensured in backend");
      } catch (backendError) {
        if (backendError.response?.status === 409) {
          console.log("Google user already exists in backend");
        } else {
          console.log("Backend user creation failed (non-critical):", backendError.response?.status);
        }
      }
      
      navigate(from, { replace: true });
      toast.success("Login Successful! Welcome back! 🎉");
    } catch (err) {
      console.error("Google login error:", err);
      setLoading(false);
      
      let errorMessage = "Google login failed. Please try again.";
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = "Login cancelled by user.";
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <div className="flex flex-col max-w-sm sm:max-w-md md:max-w-lg w-full p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-base-200 text-base-content shadow-xl sm:shadow-2xl border border-base-300/50">
        <div className="mb-4 sm:mb-6 md:mb-8 text-center">
          <h1 className="my-2 sm:my-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-content">Welcome Back</h1>
          <p className="text-sm sm:text-base text-base-content/70">
            Sign in to access your account
          </p>
        </div>

        {/* Quick Login Credentials */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-base-content mb-2">
              🚀 Quick Demo Login
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70">
              Click any button below to auto-fill the login form
            </p>
          </div>
          
          {/* Responsive grid: 1 column on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
            {credentials.map((credential, index) => {
              const IconComponent = credential.icon;
              return (
                <motion.button
                  key={credential.id}
                  type="button"
                  onClick={() => handleCredentialClick(credential)}
                  className="relative p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden border-2 border-white/20 min-h-[100px] sm:min-h-[120px] md:min-h-[140px]"
                  style={{ 
                    background: `linear-gradient(135deg, ${credential.color} 0%, ${credential.hoverColor} 100%)`
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                >
                  {/* Background glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                    style={{ backgroundColor: credential.color }}
                  />
                  
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 md:mb-3 bg-white/25 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-white/35 transition-all duration-300">
                      <IconComponent className="text-lg sm:text-xl md:text-2xl drop-shadow-lg" />
                    </div>
                    
                    {/* Title */}
                    <div className="font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-1 drop-shadow-sm">
                      {credential.label.replace('Login as ', '')}
                    </div>
                    
                    {/* Description - hidden on very small screens */}
                    <div className="text-xs sm:text-sm opacity-90 mb-1 sm:mb-2 md:mb-3 drop-shadow-sm hidden sm:block">
                      {credential.description}
                    </div>
                    
                    {/* Action hint */}
                    <div className="text-xs opacity-75 bg-white/20 rounded-full px-2 sm:px-3 py-1 inline-block backdrop-blur-sm">
                      Click to auto-fill
                    </div>
                  </div>
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  
                  {/* Subtle animated particles */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full animate-pulse" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </motion.button>
              );
            })}
          </div>
          
          {/* Info card */}
          <motion.div 
            className="p-2 sm:p-3 md:p-4 bg-gradient-to-r from-base-300/30 to-base-300/50 rounded-lg sm:rounded-xl border border-base-300/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-2 text-base-content/80">
              <span className="text-base sm:text-lg">💡</span>
              <p className="text-xs sm:text-sm font-medium text-center">
                Demo accounts for testing • Credentials auto-fill instantly • No registration required
              </p>
            </div>
            
            {/* Debug info - remove in production */}
            <div className="mt-2 text-xs text-base-content/60 text-center">
              <p className="text-xs">⚠️ If login fails, these might be test credentials that need to be created in Firebase Auth</p>
              <button 
                type="button"
                onClick={testFirebaseConnection}
                className="mt-2 px-2 sm:px-3 py-1 bg-base-content/10 rounded text-xs hover:bg-base-content/20 transition-colors"
              >
                🔧 Test Firebase Connection
              </button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
          <div className="flex-1 h-px bg-base-300"></div>
          <p className="px-2 sm:px-3 md:px-4 text-xs sm:text-sm text-base-content/70 font-medium">Or enter credentials manually</p>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Form Start */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4 md:space-y-6"
          noValidate
        >
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-base-content">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 border rounded-lg sm:rounded-xl border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content transition-all duration-200 placeholder:text-base-content/50 text-sm sm:text-base"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm mb-2 font-semibold text-base-content">
                  Password
                </label>
                <button 
                  type="button"
                  className="text-xs text-primary hover:text-secondary transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 md:py-4 border rounded-lg sm:rounded-xl border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content transition-all duration-200 placeholder:text-base-content/50 text-sm sm:text-base"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <motion.button
              type="submit"
              className="bg-primary hover:bg-secondary w-full rounded-lg sm:rounded-xl py-2.5 sm:py-3 md:py-4 text-primary-content transition-colors font-bold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl min-h-[44px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <TbFidgetSpinner className="animate-spin mr-2" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </div>
        </form>
        {/* Form End */}

        {/* Divider */}
        <div className="flex items-center pt-3 sm:pt-4 md:pt-6 space-x-1">
          <div className="flex-1 h-px bg-base-300"></div>
          <p className="px-2 sm:px-3 md:px-4 text-xs sm:text-sm text-base-content/70 font-medium">
            Or continue with
          </p>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Google Login */}
        <motion.div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 sm:space-x-3 border mt-2 sm:mt-3 md:mt-4 p-2.5 sm:p-3 md:p-4 border-base-300 rounded-lg sm:rounded-xl cursor-pointer hover:bg-base-300/50 transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FcGoogle size={20} className="sm:w-6 sm:h-6" />
          <p className="font-semibold text-base-content text-sm sm:text-base">Continue with Google</p>
        </motion.div>

        {/* Signup Link */}
        <p className="px-2 sm:px-4 md:px-6 text-xs sm:text-sm text-center text-base-content/70 mt-3 sm:mt-4 md:mt-6">
          Don&apos;t have an account yet?{" "}
          <Link
            state={from}
            to="/signup"
            className="hover:underline hover:text-primary text-primary font-semibold transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
