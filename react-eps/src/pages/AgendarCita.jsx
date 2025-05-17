// src/pages/AgendarCita.jsx
import React, { useState } from 'react';

export default function AgendarCita() {
  const unidades = [
    { id: 1, nombre: 'Pediatría' },
    { id: 2, nombre: 'Fractura' },
    { id: 3, nombre: 'General' },
  ];
  const doctoresPorUnidad = {
    1: ['Dr. Juan Pérez'],
    2: ['Dra. María Gómez'],
    3: ['Dr. Carlos Ruiz'],
  };

  const [unidadId, setUnidadId] = useState('');
  const [doctor, setDoctor] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: enviar al backend
    alert(`Cita agendada:\nUnidad: ${unidadId}\nDoctor: ${doctor}\nFecha: ${fecha}\nHora: ${hora}`);
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-header">Agendar Cita</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Unidad</label>
            <select
              className="form-select"
              value={unidadId}
              onChange={e => { setUnidadId(e.target.value); setDoctor(''); }}
              required
            >
              <option value="">Selecciona una unidad</option>
              {unidades.map(u => (
                <option key={u.id} value={u.id}>{u.nombre}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Doctor</label>
            <select
              className="form-select"
              value={doctor}
              onChange={e => setDoctor(e.target.value)}
              required
              disabled={!unidadId}
            >
              <option value="">Selecciona un doctor</option>
              {unidadId && doctoresPorUnidad[unidadId].map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Hora</label>
              <input
                type="time"
                className="form-control"
                value={hora}
                onChange={e => setHora(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-4 w-100">
            Confirmar Cita
          </button>
        </form>
      </div>
    </div>
  );
}
