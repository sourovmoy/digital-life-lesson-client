import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminCharts from "../../../components/Charts/AdminCharts";
import { motion } from "framer-motion";

const AdminHome = () => {
  const axios = useAxiosSecure();
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
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center p-8 bg-base-100 rounded-3xl shadow-2xl border border-error/20">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-error mb-2">Dashboard Error</h3>
          <p className="text-base-content/70">Failed to load dashboard statistics</p>
        </div>
      </motion.div>
    );
  }

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
            <div className="p-4 bg-gradient-to-br from-error/20 to-error/10 rounded-2xl">
              <svg className="w-10 h-10 text-error" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-base-content">
                👑 Admin Dashboard
              </h1>
              <p className="text-base-content/70 mt-1">
                System overview and management center
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <StatCard 
            title="Total Users" 
            value={stats.totalUser} 
            icon="👥"
            color="primary"
            delay={0.1}
          />
          <StatCard 
            title="Public Lessons" 
            value={stats.totalPublicLessons} 
            icon="📚"
            color="secondary"
            delay={0.2}
          />
          <StatCard 
            title="Reported Lessons" 
            value={stats.totalReportedLessons} 
            icon="⚠️"
            color="warning"
            delay={0.3}
          />
          <StatCard 
            title="Today's Lessons" 
            value={stats.todaysLessons} 
            icon="📝"
            color="info"
            delay={0.4}
          />
          <StatCard 
            title="Top Contributors" 
            value={stats.mostActiveContributors.length} 
            icon="🏆"
            color="success"
            delay={0.5}
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-info/10 rounded-xl">
              <svg className="w-8 h-8 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-base-content">Analytics Overview</h2>
              <p className="text-base-content/70">Visual representation of system data</p>
            </div>
          </div>
          <AdminCharts stats={stats} />
        </motion.div>

        {/* Top Contributors Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-success/5 to-success/10 p-8 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-xl">
                <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content">🏆 Top Contributors</h2>
                <p className="text-base-content/70">Most active lesson creators</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {stats.mostActiveContributors.length > 0 ? (
              <div className="space-y-4">
                {stats.mostActiveContributors.map((contributor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center justify-between p-6 bg-gradient-to-r from-base-200/50 to-base-200/20 rounded-2xl border border-base-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center font-bold text-success border-2 border-success/20">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-base-content text-lg">{contributor.email}</p>
                        <p className="text-base-content/70 text-sm">Active Contributor</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success">{contributor.lessonCount}</div>
                      <div className="text-sm text-base-content/70">Lessons Created</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-base-content mb-2">No Contributors Yet</h3>
                <p className="text-base-content/70">Contributors will appear here as users create lessons</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, color, delay }) => {
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

export default AdminHome;
