import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../hooks/useAxios";
import LessonCard from "../Card/LessonCard";
import LoadingSpinner from "../Shared/LoadingSpinner";

const FeaturedLessons = () => {
  const axios = useAxios();
  const { data: featuredLessons = [], isLoading } = useQuery({
    queryKey: ["featuredLessons", true],
    queryFn: async () => {
      const res = await axios("/lessons/featured");
      return res.data.result;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <section className="featured-lessons my-20">
        <h3 className="text-2xl font-bold text-center mb-6">
          Featured Life Lessons
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredLessons.map((lesson) => (
            <LessonCard key={lesson._id} lesson={lesson} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedLessons;
