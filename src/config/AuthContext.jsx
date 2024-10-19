import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// Custom hook for accessing context
const useAuth = () => useContext(AuthContext);

// Provider component to wrap app and make auth state available
const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
