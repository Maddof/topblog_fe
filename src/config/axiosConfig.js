import axios from "axios";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

// Set the base URL for Axios requests
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  withCredentials: true, // Allow sending cookies
  validateStatus: (status) => status >= 200 && status < 300, // Only 2xx status codes are successful
});

// // Create a custom hook to set up the interceptor
const useAxiosInterceptor = () => {
  const { setAccessToken, setRole, logout } = useAuth(); // Get auth context

  useEffect(() => {
    // Add an interceptor to handle token expiration and refresh
    const interceptor = api.interceptors.response.use(
      (response) => response, // For successful responses, just return the response
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Mark the request to avoid looping

          try {
            // Request new access token using refresh token
            const response = await api.post("/auth/refresh-token");
            const newAccessToken = response.data.accessToken;
            const role = response.data.role;

            // Update accessToken in AuthContext
            setAccessToken(newAccessToken);
            setRole(role);

            // Retry the original request with the new access token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            logout(); // If refreshing fails, log the user out
          }
        }
        return Promise.reject(error); // If it's not a 401 error, just reject the promise
      }
    );

    // Eject the interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [setAccessToken, setRole, logout]); // Add dependencies for the hook
};

export { api, useAxiosInterceptor };

// Add an interceptor to handle token expiration and refresh
// api.interceptors.response.use(
//   (response) => response, // For successful responses, just return the response
//   async (error) => {
//     const auth = useAuth(); // Access auth context

//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark the request to avoid looping

//       try {
//         // Request new access token using refresh token
//         const response = await api.post("/auth/refresh-token");
//         const newAccessToken = response.data.accessToken;
//         const role = response.data.role;

//         // Update accessToken in AuthContext
//         auth.setAccessToken(newAccessToken);
//         auth.setRole(role);

//         // Retry the original request with the new access token
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         auth.logout(); // If refreshing fails, log the user out
//       }
//     }
//     return Promise.reject(error); // If it's not a 401 error, just reject the promise
//   }
// );

// const AxiosInterceptor = () => {
//   useEffect(() => {
//     const resInterceptor = (response) => {
//       return response;
//     };

//     const errInterceptor = (error) => {
//       return Promise.reject(error);
//     };

//     const interceptor = instance.interceptors.response.use(
//       resInterceptor,
//       errInterceptor
//     );
//     return () => instance.interceptors.response.eject(interceptor);
//   }, []);
// };
