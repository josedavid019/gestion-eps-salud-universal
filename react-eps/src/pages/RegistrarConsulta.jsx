// src/pages/RegistrarConsulta.jsx
import React, { useState } from 'react';

export default function RegistrarConsulta() {
  const [citaId, setCitaId] = useState('');
  const [sintoma, setSintoma] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0,10));

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: enviar al backend: citaId, sintoma, tratamiento, fecha
    alert(`Consulta registrada:\nCita ID: ${citaId}\nFecha: ${fecha}\nSíntoma: ${sintoma}\nTratamiento: ${tratamiento}`);
    // limpiar campos
    setCitaId(''); setSintoma(''); setTratamiento('');
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Registrar Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID de Cita</label>
          <input
            type="text"
            className="form-control"
            value={citaId}
            onChange={e => setCitaId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Síntoma Observado</label>
          <textarea
            className="form-control"
            rows="3"
            value={sintoma}
            onChange={e => setSintoma(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Tratamiento Prescrito</label>
          <textarea
            className="form-control"
            rows="3"
            value={tratamiento}
            onChange={e => setTratamiento(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">Guardar Consulta</button>
      </form>
    </div>
  );
}
