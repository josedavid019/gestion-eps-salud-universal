// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';   

export default function Home() {
  const unidades = [
    { nombre: 'Pediatría', planta: 1, doctor: 'Dr. Juan Pérez' },
    { nombre: 'Fractura',  planta: 2, doctor: 'Dra. María Gómez' },
    { nombre: 'General',   planta: 3, doctor: 'Dr. Carlos Ruiz' },
  ];

  return (
    <>
      <h1 className="text-center mb-4">EPS Salud Universal</h1>
      <div className="card mb-4">
        <div className="card-header fw-bold">Unidades Disponibles</div>
        <ul className="list-group list-group-flush">
          {unidades.map((u, i) => (
            <li key={i} className="list-group-item">
              {u.nombre} (Planta {u.planta}) – {u.doctor}
            </li>
          ))}
        </ul>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/agendar" className="btn btn-success">Agendar Cita</Link>
        <Link to="/mis-citas" className="btn btn-success">Mis Citas</Link>
        <Link to="/historial" className="btn btn-success">Historial Clínico</Link>
      </div>
    </>
  );
}
