import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const { data = { role: "user", isPremium: false }, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: user?.email && !!user,
    queryFn: async () => {
      const result = await axios.get(`/users/${user?.email}/role`);
      return result.data;
    },
  });
  return { role: data.role, isPremium: data.isPremium, roleLoading: isLoading };
};

export default useRole;
