// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { accessToken, role, isLoading } = useAuth(); // Access auth state from context

  if (isLoading) {
    // Show a loading spinner or message while session is being checked
    // Prevents Redirect Loops: By ensuring that protected routes only
    // redirect when the session check has completed.
    return <p>Loading...</p>;
  }

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
