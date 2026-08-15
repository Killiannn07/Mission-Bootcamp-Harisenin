import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Services/authService";

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
