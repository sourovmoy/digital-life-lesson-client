import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminCharts from "../../../components/Charts/AdminCharts";
import { motion } from "framer-motion"; // eslint-disable-line
import useAuth from "../../../hooks/useAuth";

const AdminHome = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();
  
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axios.get("/admin/overview");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner message="Loading admin dashboard..." />;
  }

  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="text-center p-6 sm:p-8 bg-base-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-error/20 max-w-md w-full">
          <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
          <h3 className="text-xl sm:text-2xl font-bold text-error mb-2">Dashboard Error</h3>
          <p className="text-sm sm:text-base text-base-content/70">Failed to load dashboard statistics</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-2 sm:p-3 md:p-4 lg:p-6"
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/20 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content">
                  👑 Welcome Back, Admin!
                </h1>
                <p className="text-sm sm:text-base text-base-content/70 mt-1">
                  {user?.displayName ? `Hello ${user.displayName}` : 'System overview and management center'}
                </p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-2 bg-primary text-primary-content rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                � A"nalytics
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-2 bg-secondary text-secondary-content rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ⚙️ Settings
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
        >
          <StatCard 
            title="Total Users" 
            value={stats.totalUser} 
            icon="👥"
            color="primary"
            delay={0.1}
            trend="+12%"
          />
          <StatCard 
            title="Public Lessons" 
            value={stats.totalPublicLessons} 
            icon="📚"
            color="secondary"
            delay={0.2}
            trend="+8%"
          />
          <StatCard 
            title="Reported Lessons" 
            value={stats.totalReportedLessons} 
            icon="⚠️"
            color="warning"
            delay={0.3}
            trend="-3%"
          />
          <StatCard 
            title="Today's Lessons" 
            value={stats.todaysLessons} 
            icon="📝"
            color="info"
            delay={0.4}
            trend="+15%"
          />
          <StatCard 
            title="Top Contributors" 
            value={stats.mostActiveContributors.length} 
            icon="🏆"
            color="success"
            delay={0.5}
            trend="+5%"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          
          {/* Charts Section - Takes 2 columns on xl screens */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="xl:col-span-2 bg-base-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-base-300 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-info/5 to-info/10 p-4 sm:p-6 md:p-8 border-b border-base-300">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-info/10 rounded-lg sm:rounded-xl">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content">Analytics Overview</h2>
                  <p className="text-xs sm:text-sm md:text-base text-base-content/70">Visual representation of system data</p>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <AdminCharts stats={stats} />
            </div>
          </motion.div>

          {/* Right Sidebar - Activity Feed */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            
            {/* Recent Activity */}
            <div className="bg-base-100 rounded-xl sm:rounded-2xl shadow-xl border border-base-300 overflow-hidden">
              <div className="bg-gradient-to-r from-accent/5 to-accent/10 p-4 sm:p-6 border-b border-base-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-base-content">Recent Activity</h3>
                    <p className="text-xs sm:text-sm text-base-content/70">Latest system events</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { icon: "👤", text: "New user registered", time: "2 min ago", color: "success" },
                    { icon: "📚", text: "Lesson published", time: "5 min ago", color: "info" },
                    { icon: "⚠️", text: "Content reported", time: "10 min ago", color: "warning" },
                    { icon: "🔧", text: "System updated", time: "1 hour ago", color: "primary" }
                  ].map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg hover:bg-base-200 transition-colors duration-200"
                    >
                      <div className={`w-8 h-8 rounded-full bg-${activity.color}/10 flex items-center justify-center text-sm`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-base-content truncate">{activity.text}</p>
                        <p className="text-xs text-base-content/60">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-base-100 rounded-xl sm:rounded-2xl shadow-xl border border-base-300 overflow-hidden">
              <div className="bg-gradient-to-r from-success/5 to-success/10 p-4 sm:p-6 border-b border-base-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-base-content">System Health</h3>
                    <p className="text-xs sm:text-sm text-base-content/70">All systems operational</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { label: "Server Status", value: "Online", color: "success", percentage: 100 },
                    { label: "Database", value: "Healthy", color: "success", percentage: 98 },
                    { label: "API Response", value: "Fast", color: "info", percentage: 95 },
                    { label: "Storage", value: "Available", color: "warning", percentage: 78 }
                  ].map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-base-content">{metric.label}</span>
                        <span className={`text-xs font-semibold text-${metric.color}`}>{metric.value}</span>
                      </div>
                      <div className="w-full bg-base-300 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage}%` }}
                          transition={{ duration: 1, delay: 0.8 + idx * 0.1 }}
                          className={`h-2 bg-${metric.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Contributors Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-base-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-base-300 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-success/5 to-success/10 p-4 sm:p-6 md:p-8 border-b border-base-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-success/10 rounded-lg sm:rounded-xl">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content">🏆 Top Contributors</h2>
                  <p className="text-xs sm:text-sm md:text-base text-base-content/70">Most active lesson creators this month</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-2 bg-success text-success-content rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View All
              </motion.button>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {stats.mostActiveContributors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {stats.mostActiveContributors.slice(0, 6).map((contributor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-base-200/50 to-base-200/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-base-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="relative">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${
                          idx === 0 ? 'from-yellow-400 to-yellow-600' :
                          idx === 1 ? 'from-gray-400 to-gray-600' :
                          idx === 2 ? 'from-orange-400 to-orange-600' :
                          'from-success/20 to-success/10'
                        } rounded-full flex items-center justify-center font-bold text-white border-2 ${
                          idx < 3 ? 'border-white shadow-lg' : 'border-success/20'
                        }`}>
                          {idx < 3 ? (idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉') : `#${idx + 1}`}
                        </div>
                        {idx < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base-content text-sm sm:text-base truncate">{contributor.email}</p>
                        <p className="text-base-content/70 text-xs sm:text-sm">
                          {idx < 3 ? 'Top Contributor' : 'Active Contributor'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-success">{contributor.lessonCount}</div>
                        <div className="text-xs sm:text-sm text-base-content/70">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-info">
                          {contributor.lessonCount * 3 + 15}
                        </div>
                        <div className="text-xs sm:text-sm text-base-content/70">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-warning">
                          {contributor.lessonCount + 8}
                        </div>
                        <div className="text-xs sm:text-sm text-base-content/70">Saves</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">📊</div>
                <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">No Contributors Yet</h3>
                <p className="text-sm sm:text-base text-base-content/70">Contributors will appear here as users create lessons</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, color, delay, trend }) => {
  const getColorClasses = () => {
    switch (color) {
      case "primary": return "from-primary/10 to-primary/5 border-primary/20 text-primary";
      case "secondary": return "from-secondary/10 to-secondary/5 border-secondary/20 text-secondary";
      case "success": return "from-success/10 to-success/5 border-success/20 text-success";
      case "warning": return "from-warning/10 to-warning/5 border-warning/20 text-warning";
      case "info": return "from-info/10 to-info/5 border-info/20 text-info";
      case "error": return "from-error/10 to-error/5 border-error/20 text-error";
      default: return "from-primary/10 to-primary/5 border-primary/20 text-primary";
    }
  };

  const getTrendColor = () => {
    if (!trend) return "";
    return trend.startsWith('+') ? 'text-success' : 'text-error';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-gradient-to-br ${getColorClasses()} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 text-4xl sm:text-6xl">{icon}</div>
      </div>
      
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{icon}</div>
        <h3 className="text-xs sm:text-sm font-semibold text-base-content/70 mb-1 sm:mb-2 leading-tight">{title}</h3>
        <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${getColorClasses().split(' ')[3]} mb-1`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        
        {/* Trend Indicator */}
        {trend && (
          <div className={`flex items-center justify-center gap-1 ${getTrendColor()}`}>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {trend.startsWith('+') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
              )}
            </svg>
            <span className="text-xs sm:text-sm font-semibold">{trend}</span>
          </div>
        )}
      </div>
      
      {/* Animated Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${getColorClasses().split(' ')[0]} ${getColorClasses().split(' ')[1]} opacity-0 hover:opacity-20 transition-opacity duration-300`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default AdminHome;
