// src/pages/DoctorHome.jsx
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

export default function DoctorHome() {
  const [appointments, setAppointments] = useState([]);
  const [filterTime, setFilterTime] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [currentAppt, setCurrentAppt] = useState(null);
  const [formConsulta, setFormConsulta] = useState({ sintoma: '', tratamiento: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
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

  const handleFilter = e => setFilterTime(e.target.value);

  const filtered = appointments.filter(a => {
    if (filterTime === 'all') return true;
    const hour = parseISO(a.datetime).getHours();
    return filterTime === 'morning' ? hour < 12 : hour >= 12;
  });

  const openRegister = appt => {
    setCurrentAppt(appt);
    setFormConsulta({ sintoma: '', tratamiento: '' });
    setErrors({});
    setShowModal(true);
  };

  const closeRegister = () => {
    setShowModal(false);
    setCurrentAppt(null);
  };

  const handleConsultaChange = e => {
    const { name, value } = e.target;
    setFormConsulta(prev => ({ ...prev, [name]: value }));
  };

  const validateConsulta = () => {
    const errs = {};
    if (formConsulta.sintoma.length < 5 || formConsulta.sintoma.length > 500) {
      errs.sintoma = 'Debe tener entre 5 y 500 caracteres';
    }
    if (formConsulta.tratamiento.length < 5 || formConsulta.tratamiento.length > 500) {
      errs.tratamiento = 'Debe tener entre 5 y 500 caracteres';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveConsulta = () => {
    if (!validateConsulta()) return;
    // Marcar atendida
    handleMark(currentAppt.id);
    closeRegister();
    alert('Consulta registrada correctamente');
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
            <tr><th>Hora</th><th>Paciente</th><th>Estado</th><th>Acciones</th></tr>
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
                <div className="mb-3">
                  <label className="form-label">Síntoma Observado</label>
                  <textarea
                    className="form-control"
                    name="sintoma"
                    rows="3"
                    value={formConsulta.sintoma}
                    onChange={handleConsultaChange}
                    required
                    minLength={5}
                    maxLength={500}
                  />
                  {errors.sintoma && <div className="text-danger">{errors.sintoma}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Tratamiento Prescrito</label>
                  <textarea
                    className="form-control"
                    name="tratamiento"
                    rows="3"
                    value={formConsulta.tratamiento}
                    onChange={handleConsultaChange}
                    required
                    minLength={5}
                    maxLength={500}
                  />
                  {errors.tratamiento && <div className="text-danger">{errors.tratamiento}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeRegister}>Cerrar</button>
                <button className="btn btn-primary" onClick={handleSaveConsulta}>Guardar Consulta</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}