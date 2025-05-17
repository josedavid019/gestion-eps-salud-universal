// src/pages/HistorialClinico.jsx
import React, { useState } from 'react';

export default function HistorialClinico() {
  const [historial, setHistorial] = useState([
    {
      id: 1,
      fecha: '2025-04-10',
      sintoma: 'Dolor de cabeza',
      tratamiento: 'Analgésicos'
    },
    {
      id: 2,
      fecha: '2025-03-22',
      sintoma: 'Fiebre',
      tratamiento: 'Paracetamol'
    }
  ]);

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Historial Clínico</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Fecha</th>
                  <th>Síntoma</th>
                  <th>Tratamiento</th>
                </tr>
              </thead>
              <tbody>
                {historial.map(item => (
                  <tr key={item.id}>
                    <td>{item.fecha}</td>
                    <td>{item.sintoma}</td>
                    <td>{item.tratamiento}</td>
                  </tr>
                ))}
                {historial.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center py-3">
                      No hay registros clínicos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}