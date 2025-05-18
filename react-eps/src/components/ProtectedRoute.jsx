// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ requiredRole }) {
  const role = localStorage.getItem('role');
  if (!role) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    // Redirect unauthorized roles to their home
    const homeRoute = role === 'doctor' ? '/doctor-home' : role === 'admin' ? '/admin' : '/home';
    return <Navigate to={homeRoute} replace />;
  }
  return <Outlet />;
}
