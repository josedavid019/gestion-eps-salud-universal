// src/components/Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
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