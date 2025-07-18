import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // If not logged in → redirect to login
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // If role not allowed → redirect to correct page
  if (!allowedRoles.includes(loggedInUser.role)) {
    if (loggedInUser.role === "provider") {
      return <Navigate to="/provider-home" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
