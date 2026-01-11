import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import { customToast } from "../../../utils/customToast";
import Swal from "sweetalert2";

const ReportedLessons = () => {
  const axios = useAxiosSecure();
  const { data: reports = [], refetch, isLoading } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axios.get(`/lessons?reports=true`);
      return res.data.result;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const highPriorityReports = reports.filter(report => report.reports?.length >= 3);
  const mediumPriorityReports = reports.filter(report => report.reports?.length === 2);
  const lowPriorityReports = reports.filter(report => report.reports?.length === 1);

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
            <div className="p-4 bg-gradient-to-br from-warning/20 to-warning/10 rounded-2xl">
              <svg className="w-10 h-10 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-base-content">
                ⚠️ Reported Lessons
              </h1>
              <p className="text-base-content/70 mt-1">
                Review and moderate reported content
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
            title="Total Reports" 
            value={reports.length} 
            icon="⚠️"
            color="warning"
            delay={0.1}
          />
          <StatCard 
            title="High Priority" 
            value={highPriorityReports.length} 
            icon="🚨"
            color="error"
            delay={0.2}
          />
          <StatCard 
            title="Medium Priority" 
            value={mediumPriorityReports.length} 
            icon="⚡"
            color="warning"
            delay={0.3}
          />
          <StatCard 
            title="Low Priority" 
            value={lowPriorityReports.length} 
            icon="📋"
            color="info"
            delay={0.4}
          />
        </motion.div>

        {/* Priority Alert */}
        {highPriorityReports.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-error/10 to-error/5 border border-error/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <svg className="w-6 h-6 text-error" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-error">🚨 Urgent Attention Required</h3>
                <p className="text-error/80 text-sm">
                  {highPriorityReports.length} lesson(s) have 3+ reports and need immediate review
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {reports.length > 0 ? reports.map((report, index) => (
            <ReportCard 
              key={report._id} 
              report={report} 
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
                  ✅
                </motion.div>
                <h3 className="text-2xl font-bold text-base-content mb-4">No Reports Found</h3>
                <p className="text-base-content/70 leading-relaxed">
                  Great! No lessons have been reported at this time
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Moderation Guidelines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-info/10 rounded-lg">
              <svg className="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-base-content">📋 Moderation Guidelines</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-error/5 border border-error/20 rounded-xl">
              <h4 className="font-semibold text-error mb-2">🚨 High Priority (3+ Reports)</h4>
              <p className="text-base-content/70">Requires immediate attention and potential removal</p>
            </div>
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl">
              <h4 className="font-semibold text-warning mb-2">⚡ Medium Priority (2 Reports)</h4>
              <p className="text-base-content/70">Review content and consider warnings or edits</p>
            </div>
            <div className="p-4 bg-info/5 border border-info/20 rounded-xl">
              <h4 className="font-semibold text-info mb-2">📋 Low Priority (1 Report)</h4>
              <p className="text-base-content/70">Monitor and review when time permits</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Report Card Component
const ReportCard = ({ report, refetch, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axios = useAxiosSecure();

  const getPriorityLevel = (reportCount) => {
    if (reportCount >= 3) return { level: 'high', color: 'error', icon: '🚨', text: 'High Priority' };
    if (reportCount === 2) return { level: 'medium', color: 'warning', icon: '⚡', text: 'Medium Priority' };
    return { level: 'low', color: 'info', icon: '📋', text: 'Low Priority' };
  };

  const priority = getPriorityLevel(report?.reports?.length || 0);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this lesson deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BC6C25",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete Lesson!",
      background: document.documentElement.getAttribute('data-theme') === 'night' ? '#1f2937' : '#ffffff',
      color: document.documentElement.getAttribute('data-theme') === 'night' ? '#f3f4f6' : '#1f2937',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/lessons/${report._id}`).then((res) => {
          if (res.data.result.deletedCount) {
            customToast.success("Lesson deleted successfully! 🗑️");
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
          <div className="flex items-start justify-between mb-4">
            {/* Lesson Info */}
            <div className="flex-1 mr-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {report?.title}
                  </h3>
                  <p className="text-base-content/50 text-sm mt-1">
                    ID: {report?._id?.slice(-8)}
                  </p>
                </div>
              </div>

              {/* Lesson Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-base-content/70">Category:</span>
                  <p className="font-semibold text-base-content">{report?.category || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-base-content/70">Author:</span>
                  <p className="font-semibold text-base-content">{report?.author?.name || 'Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Priority Badge */}
            <div className="flex flex-col items-end gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                priority.color === 'error' 
                  ? 'bg-error/10 text-error border border-error/20' 
                  : priority.color === 'warning'
                  ? 'bg-warning/10 text-warning border border-warning/20'
                  : 'bg-info/10 text-info border border-info/20'
              }`}>
                {priority.icon} {priority.text}
              </span>
              
              <div className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full">
                <svg className="w-4 h-4 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-semibold text-base-content">
                  {report?.reports?.length || 0} Reports
                </span>
              </div>
            </div>
          </div>

          {/* Recent Reports Preview */}
          {report?.reports && report.reports.length > 0 && (
            <div className="mb-4 p-4 bg-base-200/50 rounded-xl">
              <h4 className="text-sm font-semibold text-base-content/70 mb-2">Recent Report Reasons:</h4>
              <div className="space-y-1">
                {report.reports.slice(0, 2).map((r, idx) => (
                  <p key={idx} className="text-sm text-base-content/80 bg-base-100 px-3 py-1 rounded-lg">
                    "{r?.reason}"
                  </p>
                ))}
                {report.reports.length > 2 && (
                  <p className="text-xs text-base-content/50 italic">
                    +{report.reports.length - 2} more reasons...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-info to-info/80 text-info-content py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View All Reports
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="bg-gradient-to-r from-error to-error/80 text-error-content py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Lesson
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Custom Reports Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-warning/10 to-warning/5 p-6 border-b border-base-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-warning/10 rounded-xl">
                    <svg className="w-8 h-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-base-content">All Report Details</h3>
                    <p className="text-base-content/70 text-sm">
                      {report?.reports?.length || 0} reports for "{report?.title}"
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-base-content/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {report?.reports && report.reports.length > 0 ? (
                  report.reports.map((r, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-base-200 rounded-xl p-4 border border-base-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-error/10 rounded-lg flex-shrink-0">
                          <span className="text-lg">⚠️</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base-content mb-1">Report #{idx + 1}</h4>
                          <p className="text-base-content/80 leading-relaxed">"{r?.reason}"</p>
                          <p className="text-xs text-base-content/50 mt-2">
                            Reported by: {r?.reportedBy || 'Anonymous'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📝</div>
                    <p className="text-base-content/70">No report details available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-base-300 bg-base-50">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="flex-1 bg-gradient-to-r from-error to-error/80 text-error-content py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Lesson
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-base-200 hover:bg-base-300 text-base-content py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Close
                </motion.button>
              </div>
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
      case "warning": return "from-warning/10 to-warning/5 border-warning/20 text-warning";
      case "error": return "from-error/10 to-error/5 border-error/20 text-error";
      case "info": return "from-info/10 to-info/5 border-info/20 text-info";
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

export default ReportedLessons;