import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    edad: '',
    tipoAfiliacion: '',
    fechaIngreso: '',
    especialidad: '',
    jornada: 'Matinal',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleRoleChange = e => {
    const r = e.target.value;
    setRole(r);
    // reset fields no aplicables
    setForm(f => ({
      ...f,
      especialidad: '',
      jornada: 'Matinal',
      edad: '',
      tipoAfiliacion: '',
      fechaIngreso: ''
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: llamar al backend para registrar
    alert(`Registrado como ${role}:\n${JSON.stringify(form, null,2)}`);
    navigate('/');
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Registro de {role === 'patient' ? 'Paciente' : 'Doctor'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-select" value={role} onChange={handleRoleChange}>
            <option value="patient">Paciente</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Identificación</label>
          <input
            type="text"
            name="id"
            className="form-control"
            value={form.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={form.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>

        {role === 'patient' ? (
          <>
            <div className="row">
              <div className="col mb-3">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  name="edad"
                  className="form-control"
                  value={form.edad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col mb-3">
                <label className="form-label">Tipo de afiliación</label>
                <input
                  type="text"
                  name="tipoAfiliacion"
                  className="form-control"
                  value={form.tipoAfiliacion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de ingreso</label>
              <input
                type="date"
                name="fechaIngreso"
                className="form-control"
                value={form.fechaIngreso}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Especialidad</label>
              <input
                type="text"
                name="especialidad"
                className="form-control"
                value={form.especialidad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Jornada</label>
              <select
                name="jornada"
                className="form-select"
                value={form.jornada}
                onChange={handleChange}
                required
              >
                <option value="Matinal">Matinal</option>
                <option value="Vespertina">Vespertina</option>
              </select>
            </div>
          </>
        )}

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
