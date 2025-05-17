// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand text-white" to={role === 'doctor' ? '/home' : '/'}>
            EPS Salud Universal
          </Link>
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
              {role === 'doctor' ? (
                <>                  
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/home">
                      Agenda del Día
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/registrar-consulta">
                      Registrar Consulta
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/buscar-paciente">
                      Buscar Paciente
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/agendar">
                      Agendar Cita
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/mis-citas">
                      Mis Citas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/historial">
                      Historial Clínico
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}