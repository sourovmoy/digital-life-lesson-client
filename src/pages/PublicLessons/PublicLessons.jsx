import { useQuery } from "@tanstack/react-query";

import React from "react";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import LessonCard from "../../components/Card/LessonCard";
import Container from "../../components/Shared/Container";

const PublicLessons = () => {
  const axios = useAxios();
  const {
    data: lessons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["PublicLessons"],
    queryFn: async () => {
      const res = await axios.get("/public-lessons");
      return res.data.result;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold">Public Lessons</h3>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
          {lessons.map((lesson, index) => (
            <LessonCard key={index} lesson={lesson}></LessonCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PublicLessons;
