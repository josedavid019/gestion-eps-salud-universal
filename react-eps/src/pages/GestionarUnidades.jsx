// src/pages/GestionarUnidades.jsx
import React, { useState, useEffect } from 'react';

export default function GestionarUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ id: '', nombre: '', planta: '', doctorResponsable: '' });

  useEffect(() => {
    // TODO: fetch('/api/unidades')
    setUnidades([
      { id: 'U1', nombre: 'Pediatría', planta: 1, doctorResponsable: 'D1' },
      { id: 'U2', nombre: 'Fractura', planta: 2, doctorResponsable: 'D2' }
    ]);
    // TODO: fetch('/api/doctores') para llenar dropdown
    setDoctores([
      { id: 'D1', nombre: 'Juan Pérez' },
      { id: 'D2', nombre: 'María Gómez' }
    ]);
  }, []);

  const openModal = unidad => {
    if (unidad) {
      setEditing(unidad.id);
      setForm({ ...unidad });
    } else {
      setEditing(null);
      setForm({ id: '', nombre: '', planta: '', doctorResponsable: '' });
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
    const nuevaUnidad = { ...form, planta: Number(form.planta) };
    if (editing) {
      setUnidades(prev => prev.map(u => u.id === editing ? nuevaUnidad : u));
    } else {
      setUnidades(prev => [...prev, nuevaUnidad]);
    }
    closeModal();
  };

  const handleDelete = id => {
    if (window.confirm('¿Eliminar unidad?')) {
      setUnidades(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Unidades</h2>
      <button className="btn btn-success mb-3" onClick={() => openModal(null)}>Nueva Unidad</button>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Planta</th>
              <th>Doctor Responsable</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.planta}</td>
                <td>{doctores.find(d => d.id === u.doctorResponsable)?.nombre || u.doctorResponsable}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => openModal(u)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
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
                <h5 className="modal-title">{editing ? 'Editar Unidad' : 'Nueva Unidad'}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {[
                    { name: 'id', label: 'ID', type: 'text' },
                    { name: 'nombre', label: 'Nombre', type: 'text' },
                    { name: 'planta', label: 'Planta', type: 'number' }
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
                    <label className="form-label">Doctor Responsable</label>
                    <select
                      className="form-select"
                      name="doctorResponsable"
                      value={form.doctorResponsable}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona un doctor</option>
                      {doctores.map(d => (
                        <option key={d.id} value={d.id}>{d.nombre}</option>
                      ))}
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