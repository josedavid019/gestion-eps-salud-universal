// src/pages/MisCitas.jsx
import React, { useEffect, useState } from 'react';

export default function MisCitas() {
  // Datos de ejemplo; más adelante los traerás de tu API
  const [citas, setCitas] = useState([
    {
      id: 1,
      unidad: 'Pediatría',
      doctor: 'Dr. Juan Pérez',
      fecha: '2025-05-20',
      hora: '09:30',
      estado: 'Confirmada'
    },
    {
      id: 2,
      unidad: 'General',
      doctor: 'Dr. Carlos Ruiz',
      fecha: '2025-05-22',
      hora: '14:00',
      estado: 'Pendiente'
    }
  ]);

  // En el futuro: usar useEffect + fetch a /api/citas
  // useEffect(() => {
  //   fetchMisCitas().then(data => setCitas(data));
  // }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Mis Citas</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Unidad</th>
                <th>Doctor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(c => (
                <tr key={c.id}>
                  <td>{c.unidad}</td>
                  <td>{c.doctor}</td>
                  <td>{c.fecha}</td>
                  <td>{c.hora}</td>
                  <td>{c.estado}</td>
                </tr>
              ))}
              {citas.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-3">
                    No tienes citas agendadas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
