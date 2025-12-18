import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import LessonCard from "../../components/Card/LessonCard";
import Container from "../../components/Shared/Container";
import { FaSearch } from "react-icons/fa";

const LIMIT = 12;

const PublicLessons = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);

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
    <div className="py-10">
      <h3 className="text-center text-3xl font-semibold mb-8">
        Public Life Lessons
      </h3>

      <Container>
        <form onSubmit={handelSearch} className="flex justify-center mb-6">
          <input
            name="search"
            type="text"
            placeholder="Search lessons..."
            className="input rounded-l-full w-72"
          />
          <button className="btn rounded-r-full bg-lime-500 text-white">
            <FaSearch />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <select
            className="select select-bordered"
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
              }));
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
          </select>

          <select
            className="select select-bordered"
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                emotionalTone: e.target.value,
              }));
              setPage(1);
            }}
          >
            <option value="">All Tone</option>
            <option value="Thoughtful">Thoughtful</option>
            <option value="Motivational">Motivational</option>
            <option value="Empowering">Empowering</option>
            <option value="Peaceful">Peaceful</option>
            <option value="Warm">Warm</option>
            <option value="Encouraging">Encouraging</option>
          </select>
        </div>

        {lessons.length === 0 ? (
          <p className="text-center text-gray-500">No lessons found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  page === i + 1 ? "bg-lime-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PublicLessons;
