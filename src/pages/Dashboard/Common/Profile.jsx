import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/cover.jpg";
import useRole from "../../../hooks/useRole";
import { ImSpinner, ImSpinner10 } from "react-icons/im";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { customToast } from "../../../utils/customToast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import UserStars from "../../../components/Dashboard/Sidebar/Menu/UsersMenu/UserHome/UserStars";
import UsersPublicLessons from "../Users/ProfileComponent/UsersPublicLessons";
import { motion } from "framer-motion";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile, setUser, loading: ld } = useAuth();
  const { role, isPremium, roleLoading } = useRole();
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();
  
  const handelUpdate = () => {
    modalRef.current.showModal();
  };
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);

    const uri = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_API
    }`;
    axios.post(uri, formData).then((res) => {
      const photoURL = res.data.data.display_url;
      const userData = {
        displayName: data.displayName,
        photoURL: photoURL,
      };

      axiosSecure.patch("/users", userData).then(() => {});
      setLoading(false);

      updateUserProfile(data.displayName, photoURL).then(() => {
        modalRef.current.close();
        reset();
        customToast.success("Profile updated successfully! ✨");
        setUser({
          ...user,
          displayName: data.displayName,
          photoURL: photoURL,
        });
      });
    }).catch((error) => {
      setLoading(false);
      console.error("Error updating profile:", error);
      customToast.error("Failed to update profile. Please try again.");
    });
  };

  const { data: totalCreated = [], isLoading } = useQuery({
    queryKey: ["dashboardHome", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/lessons?email=${user?.email}`);
      return res.data.result;
    },
  });

  if (isLoading || ld) return <LoadingSpinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300 mb-8"
        >
          {/* Cover Image with Gradient Overlay */}
          <div className="relative">
            <img
              alt="cover photo"
              src={coverImg}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Profile Picture - Positioned over cover */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  alt="profile"
                  src={user?.photoURL}
                  className="w-32 h-32 object-cover rounded-full border-6 border-base-100 shadow-2xl"
                />
                {/* Premium Badge */}
                {isPremium && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  >
                    ⭐ Premium
                  </motion.div>
                )}
                
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-4 border-base-100 shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            {/* User Info Header */}
            <div className="text-center mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-base-content mb-2"
              >
                {user?.displayName}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  role === 'admin' 
                    ? 'bg-error/20 text-error border border-error/30' 
                    : 'bg-primary/20 text-primary border border-primary/30'
                }`}>
                  {roleLoading ? (
                    <ImSpinner10 className="animate-spin" />
                  ) : (
                    <>
                      {role === 'admin' ? '👑' : '👤'} {role}
                    </>
                  )}
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base-content/70 text-sm"
              >
                User ID: {user?.uid?.slice(0, 8)}...
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 text-center border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-2">{totalCreated.length}</div>
                <div className="text-sm text-base-content/70">Lessons Created</div>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 text-center border border-secondary/20">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {totalCreated.filter(lesson => lesson.visibility === 'public').length}
                </div>
                <div className="text-sm text-base-content/70">Public Lessons</div>
              </div>
              
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 text-center border border-accent/20">
                <div className="text-3xl font-bold text-accent mb-2">
                  {totalCreated.reduce((total, lesson) => total + (lesson.likes?.length || 0), 0)}
                </div>
                <div className="text-sm text-base-content/70">Total Likes</div>
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-base-200/50 rounded-2xl p-6 mb-6"
            >
              <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Full Name</label>
                  <p className="text-lg font-semibold text-base-content">{user?.displayName}</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Email Address</label>
                  <p className="text-lg font-semibold text-base-content">{user?.email}</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Account Type</label>
                  <p className="text-lg font-semibold text-base-content">
                    {isPremium ? '💎 Premium Member' : '🆓 Free Member'}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Member Since</label>
                  <p className="text-lg font-semibold text-base-content">
                    {user?.metadata?.creationTime ? 
                      new Date(user.metadata.creationTime).toLocaleDateString() : 
                      'Recently joined'
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handelUpdate}
                className="btn btn-primary btn-lg gap-3 shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Profile
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300 shadow-2xl max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content">Update Profile</h2>
                <p className="text-base-content/70">Modify your profile information</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Display Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("displayName", {
                    required: "Name is required",
                  })}
                  className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
                />
                {errors.displayName && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.displayName.message}
                  </motion.p>
                )}
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Profile Image
                </label>
                <div className="relative">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    {...register("photo", {
                      required: "Photo is required",
                    })}
                    className="w-full p-4 border-2 border-dashed border-base-300 rounded-xl focus:border-secondary focus:outline-none transition-all duration-300 bg-base-50 text-base-content file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                  />
                </div>
                {errors.photo && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-error text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.photo.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-content font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <ImSpinner className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Update Profile
                  </>
                )}
              </motion.button>
            </form>

            {/* Close Button */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-neutral">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Additional Components */}
        <UserStars totalCreated={totalCreated} />
        <UsersPublicLessons />
      </div>
    </motion.div>
  );
};

export default Profile;
