// src/pages/Home.jsx
import React from 'react';

export default function Home() {
  const unidades = [
    {
      id: 1,
      nombre: 'Pediatría',
      planta: 1,
      doctor: 'Dr. Juan Pérez',
      foto: ''
    },
    {
      id: 2,
      nombre: 'Fractura',
      planta: 2,
      doctor: 'Dra. María Gómez',
      foto: ''
    },
    {
      id: 3,
      nombre: 'General',
      planta: 3,
      doctor: 'Dr. Carlos Ruiz',
      foto: ''
    },
  ];

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">EPS Salud Universal</h1>
      <div className="row g-4">
        {unidades.map(u => (
          <div key={u.id} className="col-12 col-md-4">
            <div className="card h-100">
              <img src={u.foto} className="card-img-top" alt={u.doctor} />
              <div className="card-body">
                <h5 className="card-title">{u.nombre}</h5>
                <p className="card-text">
                  <strong>Planta:</strong> {u.planta}<br />
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