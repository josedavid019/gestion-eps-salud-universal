// src/pages/GestionarDoctores.jsx
import React, { useState, useEffect } from 'react';

export default function GestionarDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: '', nombre: '', apellido: '', direccion: '', telefono: '', especialidad: '', jornada: 'Matinal'
  });

  useEffect(() => {
    // TODO: fetch('/api/doctores')
    setDoctores([
      { id: 'D1', nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle 100', telefono: '3001234567', especialidad: 'Pediatría', jornada: 'Matinal' },
      { id: 'D2', nombre: 'María', apellido: 'Gómez', direccion: 'Av. 50', telefono: '3007654321', especialidad: 'Dermatología', jornada: 'Vespertina' }
    ]);
  }, []);

  const openModal = doctor => {
    if (doctor) {
      setEditing(doctor.id);
      setForm({ ...doctor });
    } else {
      setEditing(null);
      setForm({ id: '', nombre: '', apellido: '', direccion: '', telefono: '', especialidad: '', jornada: 'Matinal' });
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
      setDoctores(prev => prev.map(d => d.id === editing ? form : d));
    } else {
      setDoctores(prev => [...prev, form]);
    }
    closeModal();
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar doctor?')) {
      setDoctores(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Doctores</h2>
      <button className="btn btn-success mb-3" onClick={() => openModal(null)}>Nuevo Doctor</button>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Jornada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctores.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.nombre}</td>
                <td>{d.apellido}</td>
                <td>{d.direccion}</td>
                <td>{d.telefono}</td>
                <td>{d.especialidad}</td>
                <td>{d.jornada}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => openModal(d)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d.id)}>Eliminar</button>
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
                <h5 className="modal-title">{editing ? 'Editar Doctor' : 'Nuevo Doctor'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {[
                    { name: 'id', label: 'ID', type: 'text' },
                    { name: 'nombre', label: 'Nombre', type: 'text' },
                    { name: 'apellido', label: 'Apellido', type: 'text' },
                    { name: 'direccion', label: 'Dirección', type: 'text' },
                    { name: 'telefono', label: 'Teléfono', type: 'text' },
                    { name: 'especialidad', label: 'Especialidad', type: 'text' },
                  ].map(f => (
                    <div className="mb-3" key={f.name}>
                      <label className="form-label">{f.label}</label>
                      <input
                        type={f.type}
                        className="form-control"
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                  <div className="mb-3">
                    <label className="form-label">Jornada</label>
                    <select
                      className="form-select"
                      name="jornada"
                      value={form.jornada}
                      onChange={handleChange}
                      required
                    >
                      <option value="Matinal">Matinal</option>
                      <option value="Vespertina">Vespertina</option>
                    </select>
                  </div>
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