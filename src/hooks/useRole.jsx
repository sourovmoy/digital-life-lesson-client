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
      try {
        console.log("Making role API call for user:", user?.email);
        const result = await axios.get(`/users/${user?.email}/role`);
        console.log("Role API call successful:", result.data);
        return result.data;
      } catch (error) {
        console.log("User role fetch failed (expected for new users):", error.response?.status);
        // Return default values for new users who don't exist in backend yet
        if (error.response?.status === 404 || error.response?.status === 401 || error.response?.status === 403) {
          return { role: "user", isPremium: false };
        }
        throw error;
      }
    },
    retry: false, // Don't retry failed requests
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
  
  console.log("useRole returning:", { role: data.role, isPremium: data.isPremium, roleLoading: isLoading });
  return { role: data.role, isPremium: data.isPremium, roleLoading: isLoading };
};

export default useRole;
