import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '', nombre: '', apellido: '', direccion: '', telefono: '', password: ''
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Simulación: obtener datos del perfil (puedes usar fetch según el rol)
    setForm({
      id: 'U123',
      nombre: 'Usuario',
      apellido: 'Ejemplo',
      direccion: 'Calle Falsa 123',
      telefono: '3000000000',
      password: ''
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;
    // Enviar cambios al backend (ej. PUT a /api/profile)
    alert('Perfil actualizado correctamente');
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Mi Perfil</h2>
      <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
        {['id','nombre','apellido','direccion','telefono','password'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field === 'password' ? 'Contraseña' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, ingresa un valor en {field === 'password' ? 'la contraseña' : field}.
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100 mb-2">Guardar Cambios</button>
        <button type="button" className="btn btn-secondary w-100" onClick={handleLogout}>Cerrar Sesión</button>
      </form>
    </div>
  );
}
