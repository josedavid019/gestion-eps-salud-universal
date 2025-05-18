// src/pages/Profile.jsx
import React, { useState } from 'react';

export default function Profile() {
  const role = localStorage.getItem('role');

  // Mock de datos del usuario
  const [formData, setFormData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '3001234567',
    password: '',
    confirmPassword: ''
  });

  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí se actualizarían los datos (por ahora, solo se muestra una alerta)
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="card shadow p-4">
      <h3 className="mb-4">Perfil de Usuario ({role})</h3>

      {success && (
        <div className="alert alert-success" role="alert">
          Perfil actualizado con éxito.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Número de teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Nueva contraseña (opcional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Dejar en blanco si no desea cambiar"
            />
          </div>
        </div>

        {formData.password && (
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Confirmar nueva contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
