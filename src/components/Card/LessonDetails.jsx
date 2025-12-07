import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const LessonDetails = () => {
  const id = useParams();
  const axios = useAxios();

  const { data : lesson } = useQuery({
    queryKey: ["lesson", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(`/lessons/${id}`);
      return res.data;
    },
  });

  return <div></div>;
};

export default LessonDetails;
