import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import useAxios from "../../hooks/useAxios";

// Static fallback data - moved outside component to prevent re-creation
const FALLBACK_STATS = {
  totalLessons: 1250,
  totalUsers: 850,
  totalCategories: 12,
  averageRating: 4.8
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Statistics = () => {
  const axios = useAxios();
  
  const { data: stats = FALLBACK_STATS, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await axios("/statistics");
      return res.data || FALLBACK_STATS;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    // Show fallback data immediately, then update when real data loads
    placeholderData: FALLBACK_STATS,
  });

  // Memoize statistics data to prevent unnecessary re-renders
  const statisticsData = useMemo(() => [
    {
      title: "Life Lessons Shared",
      value: stats.totalLessons || FALLBACK_STATS.totalLessons,
      icon: "📚",
      color: "from-primary to-secondary"
    },
    {
      title: "Community Members", 
      value: stats.totalUsers || FALLBACK_STATS.totalUsers,
      icon: "👥",
      color: "from-secondary to-primary"
    },
    {
      title: "Categories Covered",
      value: stats.totalCategories || FALLBACK_STATS.totalCategories,
      icon: "🎯",
      color: "from-success to-success/80"
    },
    {
      title: "Average Rating",
      value: `${stats.averageRating || FALLBACK_STATS.averageRating}⭐`,
      icon: "⭐",
      color: "from-warning to-warning/80"
    }
  ], [stats]);

  return (
    <section className="statistics-section py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Join thousands of learners sharing wisdom and growing together through meaningful life lessons.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {statisticsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`
                bg-base-100 rounded-xl p-6 text-center shadow-lg hover:shadow-xl 
                transition-shadow border border-base-300 cursor-pointer
                ${isLoading ? 'animate-pulse' : ''}
              `}
            >
              <motion.div 
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
              </motion.div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-base-content/70 font-medium">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {isLoading && (
          <motion.div 
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-base-content/50">Updating latest statistics...</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Statistics;