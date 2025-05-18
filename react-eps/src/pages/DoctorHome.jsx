// src/pages/DoctorHome.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

export default function DoctorHome() {
  const [appointments, setAppointments] = useState([]);
  const [filterTime, setFilterTime] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentAppt, setCurrentAppt] = useState(null);

  useEffect(() => {
    // TODO: fetch('/api/appointments/today')
    setAppointments([
      { id: 1, paciente: 'Carlos López', datetime: '2025-05-18T09:00', status: 'pending' },
      { id: 2, paciente: 'Ana Torres',  datetime: '2025-05-18T11:00', status: 'attended' },
      { id: 3, paciente: 'Luisa Martínez', datetime: '2025-05-18T14:30', status: 'pending' },
    ]);
  }, []);

  const attendedCount = appointments.filter(a => a.status === 'attended').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  const handleMark = apptId => {
    setAppointments(prev => prev.map(a =>
      a.id === apptId ? { ...a, status: a.status === 'pending' ? 'attended' : 'pending' } : a
    ));
  };

  const handleFilter = (e) => {
    setFilterTime(e.target.value);
  };

  const filtered = appointments.filter(a => {
    if (filterTime === 'all') return true;
    const hour = parseISO(a.datetime).getHours();
    if (filterTime === 'morning') return hour < 12;
    if (filterTime === 'afternoon') return hour >= 12;
    return true;
  });

  const openRegister = appt => {
    setCurrentAppt(appt);
    setShowModal(true);
  };

  const closeRegister = () => {
    setShowModal(false);
    setCurrentAppt(null);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Agenda del Día</h2>
      <div className="mb-3 d-flex align-items-center justify-content-between">
        <div>
          <span className="badge bg-success me-2">Atendidas: {attendedCount}</span>
          <span className="badge bg-warning text-dark">Pendientes: {pendingCount}</span>
        </div>
        <div>
          <label className="me-2">Filtrar por horario:</label>
          <select value={filterTime} onChange={handleFilter} className="form-select d-inline-block w-auto">
            <option value="all">Todas</option>
            <option value="morning">Matutino</option>
            <option value="afternoon">Vespertino</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className={a.status === 'attended' ? 'table-success' : ''}>
                <td>{format(parseISO(a.datetime), 'HH:mm')}</td>
                <td>{a.paciente}</td>
                <td>{a.status === 'pending' ? 'Pendiente' : 'Atendida'}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleMark(a.id)}>
                    {a.status === 'pending' ? 'Marcar Atendida' : 'Revertir'}
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => openRegister(a)}>
                    Registrar Consulta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && currentAppt && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registrar Consulta - {currentAppt.paciente}</h5>
                <button type="button" className="btn-close" onClick={closeRegister}></button>
              </div>
              <div className="modal-body">
                {/* Aquí iría el formulario de consulta (síntomas, tratamiento, etc.) */}
                <p>Formulario de registro de consulta...</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeRegister}>Cerrar</button>
                <button className="btn btn-primary" onClick={closeRegister}>Guardar Consulta</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
