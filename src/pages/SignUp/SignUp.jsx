import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import Button from "../../components/Shared/Button/Button";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUp = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/dashboard";

  console.log("SignUp - Redirect destination:", from);

  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();

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
      const result = await createUser(email, password);
      console.log("User created:", result.user.email);
      
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
      
      // Update Firebase profile
      await updateUserProfile(name, photoURL);
      
      // Wait a moment for the auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

      toast.success("Account created successfully! Welcome! 🎉");
      
      // Navigate after a short delay to ensure auth state is updated
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
      
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "Failed to create account");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google signup successful:", result.user.email);
      
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

      toast.success("Account created successfully with Google! 🎉");
      
      // Navigate after a short delay to ensure auth state is updated
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
      
    } catch (err) {
      console.error("Google signup error:", err);
      toast.error(err?.message || "Failed to sign up with Google");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-base-200 text-base-content">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-base-content/70">Welcome to PlantNet</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary focus:border-primary bg-base-100 text-base-content"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Photo */}
            <div>
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
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-secondary/20 file:text-primary
                  hover:file:bg-secondary/30
                  bg-base-100 border border-dashed border-primary/50 rounded-md cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                  py-2"
                {...register("photo", { required: "Photo is required" })}
              />
              {errors.photo && (
                <p className="text-red-600 text-sm">{errors.photo.message}</p>
              )}
              <p className="mt-1 text-xs text-base-content/70">
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary focus:border-primary bg-base-100 text-base-content"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-base-300 focus:outline-primary focus:border-primary bg-base-100 text-base-content"
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
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              label={
                loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Continue"
                )
              }
            />
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-base-300"></div>
          <p className="px-3 text-sm text-base-content/70">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 bg-base-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-base-300 rounded cursor-pointer hover:bg-base-300/50"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-base-content/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-primary text-primary font-medium"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
