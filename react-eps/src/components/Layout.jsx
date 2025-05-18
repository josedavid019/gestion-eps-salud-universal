import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  // Ruta base según rol (validación incluida)
  let homePath = '/';
  if (role === 'admin') homePath = '/admin';
  else if (role === 'doctor') homePath = '/doctor-home';
  else if (role === 'patient') homePath = '/home';

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand text-white" to={homePath}>
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
              {role === 'patient' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/home/agendar">
                      Agendar Cita
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/home/mis-citas">
                      Mis Citas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/home/historial">
                      Historial Clínico
                    </Link>
                  </li>
                </>
              )}

              {role === 'doctor' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/doctor-home">
                      Agenda del Día
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/doctor-home/registrar-consulta">
                      Registrar Consulta
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/doctor-home/buscar-paciente">
                      Buscar Paciente
                    </Link>
                  </li>
                </>
              )}

              {role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin/pacientes">
                      Gestionar Pacientes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin/doctores">
                      Gestionar Doctores
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin/unidades">
                      Gestionar Unidades
                    </Link>
                  </li>
                </>
              )}

              {/* Enlace común para el perfil */}
              <li className="nav-item">
                <Link className="nav-link text-white" to={`${homePath}/profile`}>
                  Perfil
                </Link>
              </li>

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
