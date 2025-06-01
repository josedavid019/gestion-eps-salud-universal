// src/components/Navbar.jsx
import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role || "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getHomePath = () => {
    if (role === "admin") return "/admin";
    if (role === "doctor") return "/doctor";
    if (role === "paciente") return "/home";
    return "/login";
  };

  const homePath = getHomePath();

  const isPublicRoute =
    location.pathname === "/login" || location.pathname === "/registrar";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid px-2">
          <Link className="navbar-brand text-white" to={homePath}>
            EPS Salud Universal
          </Link>

          {user && (
            <>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  {role === "paciente" && (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white"
                          to="/home/agendar"
                        >
                          Agendar Cita
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white"
                          to="/home/mis-citas"
                        >
                          Mis Citas
                        </Link>
                      </li>
                    </>
                  )}

                  {role === "doctor" && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/doctor">
                          Agenda del Día
                        </Link>
                      </li>
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white"
                          to="/admin/pacientes"
                        >
                          Gestionar Pacientes
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white"
                          to="/admin/doctores"
                        >
                          Gestionar Doctores
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link text-white"
                          to="/admin/unidades"
                        >
                          Gestionar Unidades
                        </Link>
                      </li>
                    </>
                  )}

                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      to={`${homePath}/profile`}
                    >
                      Perfil
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Solo muestra el contenido si NO es login/registro */}
      {!isPublicRoute && (
        <main className="container-fluid px-2 py-4">
          <Outlet />
        </main>
      )}
    </>
  );
}
