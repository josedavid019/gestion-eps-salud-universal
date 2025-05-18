// src/pages/RegistrarConsulta.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RegistrarConsulta() {
  const { citaId: paramId } = useParams();
  const navigate = useNavigate();
  const [citaId, setCitaId] = useState(paramId || '');
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0,10));
  const [sintoma, setSintoma] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (paramId) setCitaId(paramId);
  }, [paramId]);

  const validate = () => {
    const errs = {};
    if (sintoma.length < 5 || sintoma.length > 500) errs.sintoma = 'Debe tener entre 5 y 500 caracteres';
    if (tratamiento.length < 5 || tratamiento.length > 500) errs.tratamiento = 'Debe tener entre 5 y 500 caracteres';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValidated(true);
    if (!validate()) return;
    // TODO: llamada al backend con { citaId, fecha, sintoma, tratamiento }
    alert('Consulta registrada con éxito');
    navigate('/doctor-home');
  };

  return (
    <div className="container my-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Registrar Consulta</h2>
      <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID de Cita</label>
          <input
            type="text"
            className="form-control"
            value={citaId}
            onChange={e => setCitaId(e.target.value)}
            required
          />
          <div className="invalid-feedback">El ID de la cita es obligatorio.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            required
          />
          <div className="invalid-feedback">Selecciona una fecha válida.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Síntoma Observado</label>
          <textarea
            className="form-control"
            rows="3"
            value={sintoma}
            onChange={e => setSintoma(e.target.value)}
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
            rows="3"
            value={tratamiento}
            onChange={e => setTratamiento(e.target.value)}
            required
            minLength={5}
            maxLength={500}
          />
          {errors.tratamiento && <div className="text-danger">{errors.tratamiento}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Guardar Consulta</button>
      </form>
    </div>
  );
}