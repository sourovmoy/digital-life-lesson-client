import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { customToast } from "../../../utils/customToast";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import coverImg from "../../../assets/images/cover.jpg";
import { ImSpinner, ImSpinner10 } from "react-icons/im";
import { motion } from "framer-motion";

const AdminProfile = () => {
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
      const photoURL = res.data.data.display_url || user?.photoURL;
      const userData = {
        displayName: data.displayName,
        photoURL: photoURL,
      };

      axiosSecure.patch("/users", userData).then(() => {});
      setLoading(false);

      updateUserProfile(data.displayName, photoURL).then(() => {
        modalRef.current.close();
        reset();
        customToast.success("Admin profile updated successfully! 👑");
        setUser({
          ...user,
          displayName: data.displayName,
          photoURL: photoURL,
        });
      });
    }).catch((error) => {
      setLoading(false);
      console.error("Error updating admin profile:", error);
      customToast.error("Failed to update profile. Please try again.");
    });
  };

  if (ld) return <LoadingSpinner />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Admin Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-base-100 shadow-2xl rounded-3xl overflow-hidden border border-base-300"
        >
          {/* Cover Image with Admin Gradient */}
          <div className="relative">
            <img
              alt="cover photo"
              src={coverImg}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-error/60 to-transparent"></div>
            
            {/* Admin Crown Badge */}
            <div className="absolute top-4 right-4">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
              >
                👑 Administrator
              </motion.div>
            </div>
            
            {/* Profile Picture - Positioned over cover */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  alt="profile"
                  src={user?.photoURL}
                  className="w-32 h-32 object-cover rounded-full border-6 border-base-100 shadow-2xl"
                />
                
                {/* Admin Badge */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-error to-error/80 text-error-content px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                >
                  👑 ADMIN
                </motion.div>
                
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-4 border-base-100 shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            {/* Admin Info Header */}
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
                <div className="px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-error/20 to-error/10 text-error border-2 border-error/30 shadow-lg">
                  {roleLoading ? (
                    <ImSpinner10 className="animate-spin" />
                  ) : (
                    <>👑 {role?.toUpperCase()}</>
                  )}
                </div>
                
                {isPremium && (
                  <div className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-700 border border-yellow-400/30">
                    ⭐ Premium
                  </div>
                )}
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base-content/70 text-sm"
              >
                Admin ID: {user?.uid?.slice(0, 8)}...
              </motion.p>
            </div>

            {/* Admin Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-2xl p-6 text-center border border-error/20">
                <div className="text-3xl font-bold text-error mb-2">∞</div>
                <div className="text-sm text-base-content/70">Admin Privileges</div>
              </div>
              
              <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-2xl p-6 text-center border border-warning/20">
                <div className="text-3xl font-bold text-warning mb-2">🛡️</div>
                <div className="text-sm text-base-content/70">System Access</div>
              </div>
              
              <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 text-center border border-success/20">
                <div className="text-3xl font-bold text-success mb-2">✓</div>
                <div className="text-sm text-base-content/70">Full Control</div>
              </div>
            </motion.div>

            {/* Admin Profile Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-error/5 to-error/10 rounded-2xl p-6 mb-6 border border-error/20"
            >
              <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Administrator Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Administrator Name</label>
                  <p className="text-lg font-semibold text-base-content">{user?.displayName}</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Admin Email</label>
                  <p className="text-lg font-semibold text-base-content">{user?.email}</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Access Level</label>
                  <p className="text-lg font-semibold text-error">🛡️ Full Administrator</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-base-content/70">Admin Since</label>
                  <p className="text-lg font-semibold text-base-content">
                    {user?.metadata?.creationTime ? 
                      new Date(user.metadata.creationTime).toLocaleDateString() : 
                      'System Administrator'
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Admin Action Button */}
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
                className="btn btn-error btn-lg gap-3 shadow-xl text-error-content"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Admin Profile
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Admin Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-error/30 shadow-2xl max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-error/10 rounded-xl">
                <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content">Update Admin Profile</h2>
                <p className="text-base-content/70">Modify administrator information</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Display Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-base-content">
                  <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Administrator Name
                </label>
                <input
                  type="text"
                  placeholder="Enter administrator name"
                  {...register("displayName", {
                    required: "Name is required",
                  })}
                  className="w-full p-4 border-2 border-base-300 rounded-xl focus:border-error focus:outline-none transition-all duration-300 bg-base-50 text-base-content"
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
                  <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Admin Profile Image
                </label>
                <div className="relative">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    {...register("photo", {
                      required: "Photo is required",
                    })}
                    className="w-full p-4 border-2 border-dashed border-base-300 rounded-xl focus:border-warning focus:outline-none transition-all duration-300 bg-base-50 text-base-content file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-warning/10 file:text-warning hover:file:bg-warning/20"
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
                className="w-full bg-gradient-to-r from-error to-error/80 text-error-content font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <ImSpinner className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Update Admin Profile
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
      </div>
    </motion.div>
  );
};

export default AdminProfile;
