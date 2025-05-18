// src/pages/Home.jsx
import React from 'react';
import DoctorHome from './DoctorHome';
import ReactHome from './Home'; 

export default function Home() {
  const role = localStorage.getItem('role');

  return role === 'doctor'
    ? <DoctorHome />
    : (
      <div className="container my-4">
        <h1 className="text-center mb-4">EPS Salud Universal</h1>
        <div className="row g-4">
          {[
            { id: 1, nombre: 'Pediatría', planta: 1, doctor: 'Dr. Juan Pérez', foto: 'https://via.placeholder.com/150?text=Dr.+Juan+P%C3%A9rez' },
            { id: 2, nombre: 'Fractura',  planta: 2, doctor: 'Dra. María Gómez', foto: 'https://via.placeholder.com/150?text=Dra.+Mar%C3%ADa+G%C3%B3mez' },
            { id: 3, nombre: 'General',   planta: 3, doctor: 'Dr. Carlos Ruiz', foto: 'https://via.placeholder.com/150?text=Dr.+Carlos+Ruiz' },
          ].map(u => (
            <div key={u.id} className="col-12 col-md-4">
              <div className="card h-100">
                <img src={u.foto} className="card-img-top" alt={u.doctor} />
                <div className="card-body">
                  <h5 className="card-title">{u.nombre}</h5>
                  <p className="card-text">
                    <strong>Planta:</strong> {u.planta}<br/>
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
