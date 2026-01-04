import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

export default function PublicRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
