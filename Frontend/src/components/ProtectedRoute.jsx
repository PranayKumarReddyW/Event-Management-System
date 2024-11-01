import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the Auth context

const ProtectedRoute = ({ element, roles }) => {
  const { user, token } = useAuth(); // Destructure user and token from context
  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  // Check if the user's role is authorized for this route
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect to home if not authorized
  }

  return element; // Render the component if authorized
};

export default ProtectedRoute;
