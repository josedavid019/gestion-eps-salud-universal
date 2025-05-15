// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (id && password) navigate('/home');
    else alert('Por favor ingrese credenciales válidas');
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
      <form className="p-4 bg-white rounded shadow-sm" style={{ width: '320px' }} onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Inicio de Sesión</h2>
        <div className="mb-3">
          <label className="form-label">Identificación</label>
          <input
            type="text"
            className="form-control"
            value={id}
            onChange={e => setId(e.target.value)}
            placeholder="Número de identificación"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}
