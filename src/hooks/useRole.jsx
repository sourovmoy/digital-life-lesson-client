import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const { data: role = "user", isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const result = await axios.get(`/users/${user?.email}/role`);
      return result.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
