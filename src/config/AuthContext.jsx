import { createContext, useState, useContext, useEffect } from "react";
import { api } from "./axiosConfig";
// import createApi from "./axiosConfig";

const AuthContext = createContext();

// Custom hook for accessing context
const useAuth = () => useContext(AuthContext);

// Provider component to wrap app and make auth state available
const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null); // Store user role
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optional: Check if there's already a session on mount
    const checkSession = async () => {
      try {
        const response = await api.post("/auth/refresh-token"); // Try to refresh token
        setAccessToken(response.data.accessToken);
        setRole(response.data.role);
      } catch (error) {
        // Ignore the 403 error if no valid refresh cookie is set
        if (error.response?.status !== 403) {
          console.error("Session check failed:", error);
        }
      } finally {
        setIsLoading(false); // Set loading to false once check is complete
      }
    };

    checkSession();
  }, []);

  const login = (token, userRole) => {
    setAccessToken(token);
    setRole(userRole); // Set the role in the context
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // Logout request to invalidate refresh token
      setAccessToken(null); // Clear access token
      setRole(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        role,
        setRole,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
