import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";
import { customToast } from "../../../utils/customToast";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axios = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`/users`);
      return res.data.result;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const adminCount = users.filter(user => user.role === 'admin').length;
  const premiumCount = users.filter(user => user.isPremium).length;
  const regularCount = users.filter(user => !user.isPremium && user.role !== 'admin').length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-4 bg-gradient-to-br from-info/20 to-info/10 rounded-2xl">
              <svg className="w-10 h-10 text-info" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-base-content">
                👥 Manage Users
              </h1>
              <p className="text-base-content/70 mt-1">
                User management and role administration
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <StatCard 
            title="Total Users" 
            value={users.length} 
            icon="👥"
            color="primary"
            delay={0.1}
          />
          <StatCard 
            title="Administrators" 
            value={adminCount} 
            icon="👑"
            color="error"
            delay={0.2}
          />
          <StatCard 
            title="Premium Users" 
            value={premiumCount} 
            icon="💎"
            color="warning"
            delay={0.3}
          />
          <StatCard 
            title="Regular Users" 
            value={regularCount} 
            icon="👤"
            color="success"
            delay={0.4}
          />
        </motion.div>

        {/* Users Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {users.length > 0 ? users.map((user, index) => (
            <UserCard 
              key={user._id} 
              user={user} 
              refetch={refetch} 
              index={index}
            />
          )) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-20"
            >
              <div className="bg-base-100 rounded-3xl p-12 shadow-xl border border-base-300 max-w-md mx-auto">
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-8xl mb-6"
                >
                  👥
                </motion.div>
                <h3 className="text-2xl font-bold text-base-content mb-4">No Users Found</h3>
                <p className="text-base-content/70 leading-relaxed">
                  No users are currently registered in the system
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-base-content/50 text-sm">
            💡 Tip: Click on user cards to manage roles and permissions
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// User Card Component
const UserCard = ({ user, refetch, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axios = useAxiosSecure();

  const handleRoleUpdate = async (newRole) => {
    const update = { role: newRole };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.displayName} as ${newRole}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BC6C25",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Update Role!",
      background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`/user/${user?._id}`, update).then((res) => {
          if (res.data.result.modifiedCount) {
            customToast.success(`${user.displayName} is now ${newRole}! 👑`);
            refetch();
            setIsModalOpen(false);
          }
        });
      }
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-16 h-16 rounded-full object-cover border-4 border-base-300 shadow-lg"
                />
                {/* Online Status */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-base-100"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                  {user?.displayName}
                </h3>
                <p className="text-base-content/70 text-sm">{user?.email}</p>
                <p className="text-base-content/50 text-xs mt-1">
                  ID: {user?._id?.slice(-8)}
                </p>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-col gap-2 items-end">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                user?.role === 'admin' 
                  ? 'bg-error/10 text-error border border-error/20' 
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}>
                {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
              </span>
              
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                user?.isPremium 
                  ? 'bg-warning/10 text-warning border border-warning/20' 
                  : 'bg-info/10 text-info border border-info/20'
              }`}>
                {user?.isPremium ? '💎 Premium' : '🆓 Regular'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-content py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manage Role
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Custom Role Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 max-w-md w-full p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-base-content">Update User Role</h3>
                <p className="text-base-content/70 text-sm">Change role for {user?.displayName}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleUpdate('admin')}
                disabled={user?.role === 'admin'}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                  user?.role === 'admin' 
                    ? 'bg-error/10 border-error/30 text-error cursor-not-allowed' 
                    : 'bg-error/5 border-error/20 text-error hover:bg-error/10 hover:border-error/40'
                }`}
              >
                <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                  👑
                </div>
                <div className="text-left">
                  <div className="font-semibold">Administrator</div>
                  <div className="text-xs opacity-70">Full system access and control</div>
                </div>
                {user?.role === 'admin' && (
                  <div className="ml-auto">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleUpdate('user')}
                disabled={user?.role === 'user'}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                  user?.role === 'user' 
                    ? 'bg-primary/10 border-primary/30 text-primary cursor-not-allowed' 
                    : 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40'
                }`}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  👤
                </div>
                <div className="text-left">
                  <div className="font-semibold">Regular User</div>
                  <div className="text-xs opacity-70">Standard user permissions</div>
                </div>
                {user?.role === 'user' && (
                  <div className="ml-auto">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.button>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-xl font-semibold transition-all duration-300"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const StatCard = ({ title, value, icon, color, delay }) => {
  const getColorClasses = () => {
    switch (color) {
      case "primary": return "from-primary/10 to-primary/5 border-primary/20 text-primary";
      case "error": return "from-error/10 to-error/5 border-error/20 text-error";
      case "warning": return "from-warning/10 to-warning/5 border-warning/20 text-warning";
      case "success": return "from-success/10 to-success/5 border-success/20 text-success";
      default: return "from-primary/10 to-primary/5 border-primary/20 text-primary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${getColorClasses()} rounded-2xl p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-base-content/70 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${getColorClasses().split(' ')[3]}`}>{value}</p>
    </motion.div>
  );
};

export default ManageUsers;
