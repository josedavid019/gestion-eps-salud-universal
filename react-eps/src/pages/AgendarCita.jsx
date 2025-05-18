// src/pages/AgendarCita.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO, isWithinInterval, setHours } from 'date-fns';

export default function AgendarCita() {
  const [unidades, setUnidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [appointments, setAppointments] = useState([]); // Simulación de citas existentes

  const [form, setForm] = useState({ unidad: '', medico: '', fecha: '', hora: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Datos simulados
    setUnidades([
      { id: 'U1', nombre: 'Pediatría' },
      { id: 'U2', nombre: 'General' }
    ]);
    setDoctores([
      { id: 'D1', nombre: 'Dr. Pérez', jornada: 'Matinal' },
      { id: 'D2', nombre: 'Dra. Gómez', jornada: 'Vespertina' }
    ]);
    // citas simuladas
    setAppointments([
      { medico: 'D1', datetime: '2025-05-18T09:00' },
      // ... hasta 10 por día
    ]);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validate = () => {
    const { medico, fecha, hora } = form;
    if (!medico || !fecha || !hora) {
      setError('Seleccione doctor, fecha y hora');
      return false;
    }
    const doctor = doctores.find(d => d.id === medico);
    const selected = parseISO(`${fecha}T${hora}`);
    // Jornada definida en horas
    const morning = { start: setHours(selected, 8), end: setHours(selected, 12) };
    const evening = { start: setHours(selected, 14), end: setHours(selected, 18) };
    const interval = doctor.jornada === 'Matinal' ? morning : evening;
    if (!isWithinInterval(selected, interval)) {
      setError(`Fuera del horario de jornada ${doctor.jornada}`);
      return false;
    }
    // contar citas del médico ese día
    const count = appointments.filter(a =>
      a.medico === medico && format(parseISO(a.datetime), 'yyyy-MM-dd') === fecha
    ).length;
    if (count >= 10) {
      setError('El doctor ya tiene 10 citas en esa fecha');
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    const datetime = `${form.fecha}T${form.hora}`;
    setAppointments(prev => [...prev, { medico: form.medico, datetime }]);
    alert('Cita agendada correctamente');
    setForm({ unidad: '', medico: '', fecha: '', hora: '' });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Agendar Cita</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Unidad</label>
          <select name="unidad" value={form.unidad} onChange={handleChange} className="form-select" required>
            <option value="">Seleccione...</option>
            {unidades.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Doctor</label>
          <select name="medico" value={form.medico} onChange={handleChange} className="form-select" required>
            <option value="">Seleccione...</option>
            {doctores.map(d => <option key={d.id} value={d.id}>{d.nombre} ({d.jornada})</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha</label>
          <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Hora</label>
          <input type="time" name="hora" value={form.hora} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Agendar</button>
        </div>
      </form>
    </div>
  );
}
