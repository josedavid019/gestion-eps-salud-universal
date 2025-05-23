// src/pages/Home.jsx
import React from 'react';
import DoctorHome from './DoctorHome';

export default function Home() {
  const role = localStorage.getItem('role');

  if (role === 'doctor') {
    return <DoctorHome />;
  }

  const unidades = [
    { id: 1, nombre: 'Pediatría', planta: 1, doctor: 'Dr. Juan Pérez', foto: 'https://via.placeholder.com/300?text=Dr.+Juan+P%C3%A9rez' },
    { id: 2, nombre: 'Fractura',  planta: 2, doctor: 'Dra. María Gómez', foto: 'https://via.placeholder.com/300?text=Dra.+Mar%C3%ADa+G%C3%B3mez' },
    { id: 3, nombre: 'General',   planta: 3, doctor: 'Dr. Carlos Ruiz', foto: 'https://via.placeholder.com/300?text=Dr.+Carlos+Ruiz' },
  ];

  return (
    <div className="container-fluid my-4 px-2">
      <h1 className="text-center mb-4">EPS Salud Universal</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {unidades.map(u => (
          <div key={u.id} className="col">
            <div className="card h-100">
              <img src={u.foto} className="card-img-top" alt={u.doctor} />
              <div className="card-body">
                <h5 className="card-title">{u.nombre}</h5>
                <p className="card-text mb-0">
                  <strong>Planta:</strong> {u.planta}
                </p>
                <p className="card-text">
                  <strong>Doctor:</strong> {u.doctor}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
