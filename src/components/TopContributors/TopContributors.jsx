import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import { FaUserCircle, FaCrown, FaMedal, FaTrophy, FaStar } from "react-icons/fa";

const TopContributors = () => {
  const axios = useAxios();
  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axios.get("/users/top-contributors");
      return res.data.result;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return { icon: FaCrown, color: "text-warning", bg: "bg-warning/20", border: "border-warning/30" };
      case 1: return { icon: FaMedal, color: "text-info", bg: "bg-info/20", border: "border-info/30" };
      case 2: return { icon: FaTrophy, color: "text-success", bg: "bg-success/20", border: "border-success/30" };
      default: return { icon: FaStar, color: "text-primary", bg: "bg-primary/20", border: "border-primary/30" };
    }
  };

  const getRankLabel = (index) => {
    switch (index) {
      case 0: return "🥇 Champion";
      case 1: return "🥈 Expert";
      case 2: return "🥉 Master";
      default: return "⭐ Contributor";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 bg-gradient-to-br from-base-100 to-base-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-base-100 rounded-2xl px-6 py-3 shadow-lg border border-base-300 mb-4">
            <div className="p-2 bg-primary/10 rounded-xl">
              <FaTrophy className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-base-content">
              🏆 Top Contributors
            </h3>
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Meet our amazing community members who share the most valuable life lessons
          </p>
        </motion.div>

        {contributors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              <h4 className="text-2xl font-bold text-base-content mb-4">No Contributors Yet</h4>
              <p className="text-base-content/70 leading-relaxed">
                Be the first to share your wisdom and become a top contributor!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {contributors.map((user, index) => {
              const rank = getRankIcon(index);
              const RankIcon = rank.icon;
              
              return (
                <motion.div
                  key={user._id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                    {/* Rank Badge */}
                    <div className={`absolute top-3 right-3 ${rank.bg} ${rank.border} border rounded-full p-2`}>
                      <RankIcon className={`w-4 h-4 ${rank.color}`} />
                    </div>

                    {/* Rank Number for Top 3 */}
                    {index < 3 && (
                      <div className="absolute top-3 left-3 w-8 h-8 bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                    )}

                    {/* Profile Image */}
                    <div className="relative mb-4">
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="mx-auto rounded-full w-20 h-20 object-cover border-4 border-base-300 group-hover:border-primary/50 transition-all duration-300 shadow-lg"
                          />
                        ) : (
                          <div className="mx-auto rounded-full w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-base-300 group-hover:border-primary/50 transition-all duration-300 shadow-lg flex items-center justify-center">
                            <FaUserCircle className="w-12 h-12 text-primary/70" />
                          </div>
                        )}
                        
                        {/* Premium Badge */}
                        {user.isPremium && (
                          <div className="absolute -bottom-1 -right-1 bg-warning text-warning-content rounded-full p-1.5 shadow-lg border-2 border-base-100">
                            <FaStar className="w-3 h-3" />
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* User Info */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-base-content group-hover:text-primary transition-colors duration-300 truncate">
                        {user.name}
                      </h4>
                      
                      <div className="space-y-1">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${rank.bg} ${rank.color} ${rank.border} border`}>
                          {getRankLabel(index)}
                        </div>
                        
                        <p className="text-sm text-base-content/70 font-semibold">
                          📚 {user.totalLessons} Lessons
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>

                  {/* Special Effects for Top 3 */}
                  {index < 3 && (
                    <motion.div
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`absolute inset-0 rounded-2xl border-2 ${
                        index === 0 ? 'border-warning/30' :
                        index === 1 ? 'border-info/30' :
                        'border-success/30'
                      } pointer-events-none`}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-base-content mb-3">
              🌟 Want to Join Our Top Contributors?
            </h4>
            <p className="text-base-content/70 mb-6">
              Share your life lessons and wisdom with our community. Every story matters and can inspire others!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaStar className="w-4 h-4" />
              Start Contributing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopContributors;
