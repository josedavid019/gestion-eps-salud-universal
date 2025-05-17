// src/pages/BuscarPaciente.jsx
import React, { useState } from 'react';

export default function BuscarPaciente() {
  const [pacienteId, setPacienteId] = useState('');
  const [historial, setHistorial] = useState([]);

  const handleBuscar = e => {
    e.preventDefault();
    // TODO: fetch historial desde backend usando pacienteId
    // fetch(`/api/historial/${pacienteId}`)...
    // Simulación:
    setHistorial([
      { id: 1, fecha: '2025-04-10', sintoma: 'Dolor de cabeza', tratamiento: 'Analgésicos' },
      { id: 2, fecha: '2025-03-22', sintoma: 'Fiebre', tratamiento: 'Paracetamol' }
    ]);
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Buscar Paciente</h2>
      <form className="d-flex mb-4" onSubmit={handleBuscar}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="ID de Paciente"
          value={pacienteId}
          onChange={e => setPacienteId(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      {historial.length > 0 && (
        <div className="table-responsive">
          <table className="table">
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}