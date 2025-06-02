// src/components/UnidadForm.jsx
import React from "react";

export default function UnidadForm({
  form,
  doctores,
  validated,
  onChange,
  onSubmit,
  onCancel,
  onDelete,
}) {
  return (
    <form
      noValidate
      className={validated ? "was-validated" : ""}
      onSubmit={onSubmit}
    >
      <div className="modal-body">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={onChange}
            required
          />
          <div className="invalid-feedback">Nombre requerido.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            name="descripcion"
            className="form-control"
            value={form.descripcion}
            onChange={onChange}
            required
          />
          <div className="invalid-feedback">Descripción requerida.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Planta</label>
          <input
            type="text"
            name="planta"
            className="form-control"
            value={form.planta}
            onChange={onChange}
            required
          />
          <div className="invalid-feedback">Planta requerida.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Doctor Responsable</label>
          <select
            name="doctor"
            className="form-select"
            value={form.doctor}
            onChange={onChange}
            required
          >
            <option value="">Selecciona un doctor</option>
            {doctores.map((d) => (
              <option key={d.usuario_id} value={d.usuario_id}>
                {d.primer_nombre} {d.primer_apellido} - {d.especialidad}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">Selecciona un doctor.</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            name="activo"
            className="form-select"
            value={form.activo}
            onChange={onChange}
            required
          >
            <option value={true}>Activa</option>
            <option value={false}>Inactiva</option>
          </select>
        </div>
      </div>

      <div className="modal-footer d-flex justify-content-between">
        {onDelete && (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onDelete}
          >
            Eliminar Unidad
          </button>
        )}
        <div>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
