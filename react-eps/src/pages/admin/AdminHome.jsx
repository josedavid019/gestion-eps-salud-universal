// src/pages/AdminHome.jsx
import React from "react";
import { Link } from "react-router-dom";

export function AdminHome() {
  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Panel de Administrador</h2>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Pacientes</h5>
              <p className="card-text">
                Registrar, editar y eliminar pacientes afiliados.
              </p>
              <Link to="/admin/pacientes" className="btn btn-primary mt-auto">
                Gestionar Pacientes
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Doctores</h5>
              <p className="card-text">
                Registrar, editar y eliminar doctores.
              </p>
              <Link to="/admin/doctores" className="btn btn-primary mt-auto">
                Gestionar Doctores
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Unidades</h5>
              <p className="card-text">Crear y administrar unidades médicas.</p>
              <Link to="/admin/unidades" className="btn btn-primary mt-auto">
                Gestionar Unidades
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
