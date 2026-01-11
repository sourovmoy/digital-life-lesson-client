import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import LessonCard from "../../components/Card/LessonCard";
import Container from "../../components/Shared/Container";
import { FaSearch, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

const LIMIT = 12;

const PublicLessons = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    emotionalTone: "",
    visibility: "public",
    search: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["public-lessons", page, filters],
    queryFn: async () => {
      const skip = (page - 1) * LIMIT;
      const res = await axios.get("/public-lessons", {
        params: {
          limit: LIMIT,
          skip,
          ...filters,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  const lessons = data?.result || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  const handelSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;

    setFilters((prev) => ({
      ...prev,
      search,
    }));

    setPage(1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200"
    >
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16"
      >
        <Container>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 bg-base-100/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-base-300">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-base-content">
                    📚 Public Life Lessons
                  </h1>
                  <p className="text-base-content/70 mt-1">
                    Discover wisdom shared by our community
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-base-content/80 max-w-2xl mx-auto mb-8"
            >
              Explore life lessons from people around the world. Learn from their experiences, 
              grow from their insights, and find inspiration for your own journey.
            </motion.p>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{total}</div>
                <div className="text-sm text-base-content/70">Total Lessons</div>
              </div>
              <div className="h-12 w-px bg-base-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{totalPages}</div>
                <div className="text-sm text-base-content/70">Pages</div>
              </div>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      <Container>
        <div className="py-12">
          {/* Search and Filters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            {/* Search Bar */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6 mb-6">
              <form onSubmit={handelSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="text-base-content/40" />
                  </div>
                  <input
                    name="search"
                    type="text"
                    placeholder="Search for life lessons, topics, or keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-base-200 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 text-base-content placeholder-base-content/50"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-primary to-secondary text-primary-content px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <FaSearch />
                  Search Lessons
                </motion.button>
              </form>
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-base-content">
                {lessons.length > 0 ? `Found ${lessons.length} lessons` : 'No lessons found'}
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-4 py-2 rounded-xl transition-all duration-300 border border-base-300"
              >
                <FaFilter />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
            </div>

            {/* Filters */}
            <motion.div 
              initial={false}
              animate={{ 
                height: showFilters ? 'auto' : 0,
                opacity: showFilters ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">
                      📂 Category
                    </label>
                    <select
                      className="w-full p-3 bg-base-200 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 text-base-content"
                      value={filters.category}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }));
                        setPage(1);
                      }}
                    >
                      <option value="">All Categories</option>
                      <option value="Personal Growth">🌱 Personal Growth</option>
                      <option value="Career">💼 Career</option>
                      <option value="Relationships">❤️ Relationships</option>
                      <option value="Mindset">🧠 Mindset</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-base-content mb-2">
                      🎭 Emotional Tone
                    </label>
                    <select
                      className="w-full p-3 bg-base-200 border-2 border-base-300 rounded-xl focus:border-primary focus:outline-none transition-all duration-300 text-base-content"
                      value={filters.emotionalTone}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          emotionalTone: e.target.value,
                        }));
                        setPage(1);
                      }}
                    >
                      <option value="">All Tones</option>
                      <option value="Thoughtful">🤔 Thoughtful</option>
                      <option value="Motivational">🚀 Motivational</option>
                      <option value="Empowering">💪 Empowering</option>
                      <option value="Peaceful">☮️ Peaceful</option>
                      <option value="Warm">🤗 Warm</option>
                      <option value="Encouraging">🌟 Encouraging</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {(filters.category || filters.emotionalTone || filters.search) && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 pt-4 border-t border-base-300"
                  >
                    <button
                      onClick={() => {
                        setFilters({
                          category: "",
                          emotionalTone: "",
                          visibility: "public",
                          search: "",
                        });
                        setPage(1);
                      }}
                      className="text-sm text-error hover:text-error/80 transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Lessons Grid */}
          {lessons.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                  🔍
                </motion.div>
                <h3 className="text-2xl font-bold text-base-content mb-4">No Lessons Found</h3>
                <p className="text-base-content/70 leading-relaxed">
                  Try adjusting your search terms or filters to discover more lessons.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <LessonCard lesson={lesson} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6">
                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-6 py-3 bg-base-200 hover:bg-primary hover:text-primary-content text-base-content rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-base-300 font-semibold"
                  >
                    ← Previous
                  </motion.button>

                  <div className="flex gap-2 mx-4">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setPage(pageNum)}
                          className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 border ${
                            page === pageNum 
                              ? "bg-gradient-to-r from-primary to-secondary text-primary-content border-primary shadow-lg" 
                              : "bg-base-200 hover:bg-base-300 text-base-content border-base-300"
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-6 py-3 bg-base-200 hover:bg-primary hover:text-primary-content text-base-content rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-base-300 font-semibold"
                  >
                    Next →
                  </motion.button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-base-content/70">
                    Showing page {page} of {totalPages} ({total} total lessons)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </motion.div>
  );
};

export default PublicLessons;
