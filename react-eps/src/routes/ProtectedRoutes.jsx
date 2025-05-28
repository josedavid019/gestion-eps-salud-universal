// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ requiredRole }) {
  const { user } = useAuth();

  // Si no hay usuario logueado, redirige al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si se requiere un rol específico y no coincide
  if (requiredRole && user.role !== requiredRole) {
    // Redirige a la home correspondiente al rol real del usuario
    const homePath =
      user.role === "admin"
        ? "/admin"
        : user.role === "doctor"
        ? "/doctor-home"
        : "/home";

    return <Navigate to={homePath} replace />;
  }

  return <Outlet />;
}
