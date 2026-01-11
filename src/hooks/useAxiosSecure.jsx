import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { getAuth } from "firebase/auth";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      console.log("Setting up axios interceptors for user:", user.email);
      console.log("User object type:", typeof user, "Has getIdToken:", typeof user.getIdToken);
      
      // Add request interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async (config) => {
          try {
            let token = null;
            
            // Try to get token from user object first
            if (user && typeof user.getIdToken === 'function') {
              token = await user.getIdToken();
              console.log("✅ Got token from user object");
            } else {
              // Fallback: get token directly from Firebase auth
              const auth = getAuth();
              if (auth.currentUser && typeof auth.currentUser.getIdToken === 'function') {
                token = await auth.currentUser.getIdToken();
                console.log("✅ Got token from Firebase auth fallback");
              } else {
                console.warn("❌ No valid user object found for token");
              }
            }
            
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
              console.log("Added auth token to request:", config.url);
            } else {
              console.warn("No token available for request:", config.url);
            }
          } catch (error) {
            console.error("Error getting Firebase token:", error);
            // Don't fail the request, just proceed without token
          }
          return config;
        }
      );

      // Add response interceptor that only logs (auto-logout disabled for now)
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => {
          console.log("Axios response success:", res.config.url, res.status);
          return res;
        },
        (err) => {
          console.log("Axios response error:", {
            url: err.config?.url,
            status: err.response?.status,
            message: err.message
          });
          
          // For now, let's not auto-logout on any errors to avoid the login loop
          // We can re-enable this later once we're sure the user object is stable
          
          return Promise.reject(err);
        }
      );

      // Cleanup to prevent multiple interceptors on re-renders
      return () => {
        console.log("Cleaning up axios interceptors");
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
