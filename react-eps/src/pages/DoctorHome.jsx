// src/pages/DoctorHome.jsx
import React, { useEffect, useState } from 'react';

export default function DoctorHome() {
  const [citasHoy, setCitasHoy] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === 'doctor') {
      // TODO: reemplazar URL con tu endpoint real
      fetch('/api/citas/today')
        .then(res => res.json())
        .then(data => setCitasHoy(data))
        .catch(err => console.error('Error fetching citas:', err));
    }
  }, [role]);

  const handleRegistrarConsulta = citaId => {
    // TODO: navegar a formulario de registro de consulta
    console.log('Registrar consulta para cita', citaId);
  };

  const handleVerDetalle = citaId => {
    // TODO: navegar a vista de detalle de consulta
    console.log('Ver detalle de cita', citaId);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Agenda del Día</h2>
      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Unidad</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {citasHoy.length > 0 ? (
                citasHoy.map(cita => (
                  <tr key={cita.id}>
                    <td>{cita.hora}</td>
                    <td>{cita.paciente}</td>
                    <td>{cita.unidad}</td>
                    <td>{cita.estado}</td>
                    <td>
                      {cita.estado === 'Pendiente' ? (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleRegistrarConsulta(cita.id)}
                        >
                          Registrar consulta
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleVerDetalle(cita.id)}
                        >
                          Ver detalle
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-3">
                    No hay citas programadas para hoy.
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