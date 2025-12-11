import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Container from "../../../../components/Shared/Container";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import LessonCard from "../../../../components/Card/LessonCard";

const UsersPublicLessons = () => {
  const { user, loading } = useAuth();
  const axios = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["usersPublicLessons", user?.email],
    queryFn: async () => {
      const res = await axios(
        `/lessons?email=${user?.email}&visibility=public`
      );
      return res.data.result;
    },
  });
  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <h1 className="text-3xl font-semibold text-center my-5 sm:my-10">
        All Public lessons by {user?.displayName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {data ? (
          data.map((lesson) => <LessonCard key={lesson._id} lesson={lesson} />)
        ) : (
          <p>No public lessons by {user?.displayName}</p>
        )}
      </div>
    </Container>
  );
};

export default UsersPublicLessons;
