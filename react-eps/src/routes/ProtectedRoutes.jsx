import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return null; // o un <LoadingSpinner />

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const homePath =
      user.role === "admin"
        ? "/admin"
        : user.role === "doctor"
        ? "/doctor"
        : "/home";

    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}
