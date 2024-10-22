// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { accessToken, role } = useAuth(); // Access auth state from context

  // If user is not logged in, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check if the user's role matches
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to home if role doesn't match
  }

  return children; // Render the protected content if all checks pass
};

export default ProtectedRoute;
