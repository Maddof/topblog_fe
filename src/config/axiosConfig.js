import axios from "axios";
import { useAuth } from "./AuthContext";

// Set the base URL for Axios requests
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // Allow sending cookies
});

// Add an interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response, // For successful responses, just return the response
  async (error) => {
    const auth = useAuth(); // Access auth context

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to avoid looping

      try {
        // Request new access token using refresh token
        const response = await api.post("/auth/refresh-token");
        const newAccessToken = response.data.accessToken;
        const role = response.data.role;

        // Update accessToken in AuthContext
        auth.setAccessToken(newAccessToken);
        auth.setRole(role);

        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        auth.logout(); // If refreshing fails, log the user out
      }
    }
    return Promise.reject(error); // If it's not a 401 error, just reject the promise
  }
);

export default api;
