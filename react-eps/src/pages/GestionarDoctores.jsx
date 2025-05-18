// src/pages/GestionarDoctores.jsx
import React, { useState, useEffect } from 'react';

export default function GestionarDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: '', nombre: '', apellido: '', direccion: '', telefono: '', especialidad: '', jornada: 'Matinal'
  });

  useEffect(() => {
    // Datos simulados
    setDoctores([
      { id: 'D1', nombre: 'Juan', apellido: 'Pérez', direccion: 'Calle 100', telefono: '3001234567', especialidad: 'Pediatría', jornada: 'Matinal' },
      { id: 'D2', nombre: 'María', apellido: 'Gómez', direccion: 'Av. 50', telefono: '3007654321', especialidad: 'Dermatología', jornada: 'Vespertina' }
    ]);
  }, []);

  const openModal = doctor => {
    setEditing(doctor ? doctor.id : null);
    setForm(doctor ? { ...doctor } : { id: '', nombre: '', apellido: '', direccion: '', telefono: '', especialidad: '', jornada: 'Matinal' });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formEl = e.target;
    if (!formEl.checkValidity()) {
      formEl.classList.add('was-validated');
      return;
    }
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

  const filtered = doctores.filter(d =>
    d.id.toLowerCase().includes(filter.toLowerCase()) ||
    d.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    d.apellido.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Doctores</h2>
      <div className="d-flex mb-3 align-items-center">
        <button className="btn btn-success me-3" onClick={() => openModal(null)}>Nuevo Doctor</button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Filtrar doctores..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Apellido</th><th>Dirección</th><th>Teléfono</th><th>Especialidad</th><th>Jornada</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td><td>{d.nombre}</td><td>{d.apellido}</td>
                <td>{d.direccion}</td><td>{d.telefono}</td><td>{d.especialidad}</td><td>{d.jornada}</td>
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
              <form onSubmit={handleSubmit} noValidate className="needs-validation">
                <div className="modal-body">
                  {[
                    { name: 'id', label: 'ID', type: 'text', pattern: '[A-Za-z0-9]+' },
                    { name: 'nombre', label: 'Nombre', type: 'text', pattern: '[A-Za-zÁÉÍÓÚáéíóúñÑ ]+' },
                    { name: 'apellido', label: 'Apellido', type: 'text', pattern: '[A-Za-zÁÉÍÓÚáéíóúñÑ ]+' },
                    { name: 'direccion', label: 'Dirección', type: 'text' },
                    { name: 'telefono', label: 'Teléfono', type: 'tel', pattern: '[0-9]{10}' },
                    { name: 'especialidad', label: 'Especialidad', type: 'text' },
                    { name: 'jornada', label: 'Jornada', type: 'select', options: ['Matinal', 'Vespertina'] }
                  ].map(f => (
                    <div className="mb-3" key={f.name}>
                      <label htmlFor={f.name} className="form-label">{f.label}</label>
                      {f.type === 'select' ? (
                        <select
                          className="form-select"
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          required
                        >
                          {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          id={f.name}
                          type={f.type}
                          className="form-control"
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          pattern={f.pattern}
                          required
                        />
                      )}
                      <div className="invalid-feedback">Ingresa un valor válido en {f.label}.</div>
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