// src/pages/GestionarPacientes.jsx
import React, { useState, useEffect } from 'react';

export default function GestionarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    id: '', nombre: '', apellido: '', direccion: '', edad: '', tipoAfiliacion: '', fechaIngreso: ''
  });

  useEffect(() => {
    setPacientes([
      { id: '1', nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle 123', edad: 30, tipoAfiliacion: 'Contributivo', fechaIngreso: '2025-01-10' },
      { id: '2', nombre: 'María', apellido: 'Gómez', direccion: 'Av. 45', edad: 25, tipoAfiliacion: 'Subsidiado', fechaIngreso: '2025-02-20' }
    ]);
  }, []);

  const openModal = paciente => {
    setValidated(false);
    if (paciente) {
      setEditing(paciente.id);
      setForm({ ...paciente });
    } else {
      setEditing(null);
      setForm({ id: '', nombre: '', apellido: '', direccion: '', edad: '', tipoAfiliacion: '', fechaIngreso: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    const formEl = e.currentTarget;
    e.preventDefault();
    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    if (editing) {
      setPacientes(prev => prev.map(p => p.id === editing ? form : p));
    } else {
      setPacientes(prev => [...prev, form]);
    }
    closeModal();
  };

  const handleDelete = id => {
    if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
      setPacientes(prev => prev.filter(p => p.id !== id));
    }
  };

  const filtered = pacientes.filter(p =>
    p.id.includes(filter) ||
    p.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    p.apellido.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Pacientes</h2>
      <div className="d-flex mb-3 align-items-center">
        <button className="btn btn-success me-3" onClick={() => openModal(null)}>Nuevo Paciente</button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Filtrar pacientes..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Apellido</th><th>Dirección</th>
              <th>Edad</th><th>Tipo Afiliación</th><th>Fecha Ingreso</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.direccion}</td>
                <td>{p.edad}</td>
                <td>{p.tipoAfiliacion}</td>
                <td>{p.fechaIngreso}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => openModal(p)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Editar Paciente' : 'Nuevo Paciente'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                <div className="modal-body">
                  {[
                    { name: 'id', label: 'ID', type: 'text', pattern: '\\d+' },
                    { name: 'nombre', label: 'Nombre', type: 'text', pattern: '[A-Za-z ]+' },
                    { name: 'apellido', label: 'Apellido', type: 'text', pattern: '[A-Za-z ]+' },
                    { name: 'direccion', label: 'Dirección', type: 'text' },
                    { name: 'edad', label: 'Edad', type: 'number', min: 1, max: 120 },
                    { name: 'tipoAfiliacion', label: 'Tipo de Afiliación', type: 'text' },
                    { name: 'fechaIngreso', label: 'Fecha de Ingreso', type: 'date' }
                  ].map(f => (
                    <div className="mb-3" key={f.name}>
                      <label htmlFor={f.name} className="form-label">{f.label}</label>
                      <input
                        id={f.name}
                        type={f.type}
                        className="form-control"
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        required
                        {...(f.pattern && { pattern: f.pattern })}
                        {...(f.min && { min: f.min })}
                        {...(f.max && { max: f.max })}
                      />
                      <div className="invalid-feedback">
                        Por favor, ingresa un valor válido en {f.label}.
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}