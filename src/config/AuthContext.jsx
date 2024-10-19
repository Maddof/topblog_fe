import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// Custom hook for accessing context
const useAuth = () => useContext(AuthContext);

// Provider component to wrap app and make auth state available
const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null); // Store user role

  const login = (token, userRole) => {
    setAccessToken(token);
    setRole(userRole); // Set the role in the context
  };

  const logout = () => {
    setAccessToken(null);
    setRole(null); // Clear the role on logout
  };

  return (
    <AuthContext.Provider value={{ accessToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
