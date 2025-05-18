// src/pages/GestionarPacientes.jsx
import React, { useState, useEffect } from 'react';

export default function GestionarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: '', nombre: '', apellido: '', direccion: '', edad: '', tipoAfiliacion: '', fechaIngreso: ''
  });

  useEffect(() => {
    // TODO: fetch '/api/pacientes'
    setPacientes([
      { id: '1', nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle 123', edad: 30, tipoAfiliacion: 'Contributivo', fechaIngreso: '2025-01-10' },
      { id: '2', nombre: 'María', apellido: 'Gómez', direccion: 'Av. 45', edad: 25, tipoAfiliacion: 'Subsidiado', fechaIngreso: '2025-02-20' }
    ]);
  }, []);

  const openModal = paciente => {
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
    e.preventDefault();
    if (editing) {
      setPacientes(prev => prev.map(p => p.id === editing ? form : p));
    } else {
      setPacientes(prev => [...prev, form]);
    }
    closeModal();
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar paciente?')) {
      setPacientes(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Pacientes</h2>
      <button className="btn btn-success mb-3" onClick={() => openModal(null)}>Nuevo Paciente</button>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Apellido</th><th>Dirección</th><th>Edad</th><th>Tipo</th><th>Ingreso</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(p => (
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
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {['id','nombre','apellido','direccion','edad','tipoAfiliacion','fechaIngreso'].map(f => (
                    <div className="mb-3" key={f}>
                      <label className="form-label">{f.charAt(0).toUpperCase()+f.slice(1).replace(/([A-Z])/g,' $1')}</label>
                      <input
                        type={f==='fechaIngreso'?'date':'text'}
                        className="form-control"
                        name={f}
                        value={form[f]}
                        onChange={handleChange}
                        required
                      />
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