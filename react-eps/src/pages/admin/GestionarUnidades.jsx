import React, { useState, useEffect } from "react";
import UnidadForm from "../../components/UnidadForm";
import {
  getUnidades,
  getUnidadesConDoctores,
  actualizarUnidad,
  eliminarUnidad,
  agregarUnidad,
} from "../../api/unidades.api";

export function GestionarUnidades() {
  const [unidades, setUnidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    planta: "",
    doctor: "",
    activo: true,
  });

  useEffect(() => {
    cargarUnidades();
    cargarDoctores();
  }, []);

  const cargarUnidades = async () => {
    try {
      const res = await getUnidades();
      setUnidades(res.data);
    } catch (error) {
      console.error("Error al cargar unidades:", error);
    }
  };

  const cargarDoctores = async () => {
    try {
      const res = await getUnidadesConDoctores();
      // Pasamos el arreglo tal cual porque ya tiene los campos correctos
      setDoctores(res.data);
    } catch (error) {
      console.error("Error al cargar doctores:", error);
    }
  };

  const openModal = (unidad = null) => {
    setValidated(false);
    if (unidad) {
      setEditing(unidad.unidad_id);
      setForm({ ...unidad });
    } else {
      setEditing(null);
      setForm({
        nombre: "",
        descripcion: "",
        planta: "",
        doctor: "",
        activo: true,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "activo" ? value === "true" || value === true : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      if (editing) {
        // Actualizar unidad existente
        await actualizarUnidad(editing, form);
      } else {
        // Crear nueva unidad
        await agregarUnidad(form);
      }

      await cargarUnidades(); // Recargar unidades después de guardar
      closeModal();
    } catch (error) {
      console.error("Error al guardar la unidad:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar unidad?")) {
      try {
        await eliminarUnidad(id);
        await cargarUnidades(); // recarga lista actualizada
        closeModal();
      } catch (error) {
        console.error("Error al eliminar unidad:", error);
      }
    }
  };

  const filtered = unidades.filter(
    (u) =>
      u.nombre.toLowerCase().includes(filter.toLowerCase()) ||
      String(u.unidad_id).includes(filter.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Unidades</h2>
      <div className="d-flex mb-3 align-items-center">
        <button className="btn btn-success me-3" onClick={() => openModal()}>
          Nueva Unidad
        </button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Filtrar unidades..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Planta</th>
              <th>Doctor Responsable</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.unidad_id}>
                <td>{u.nombre}</td>
                <td>{u.planta}</td>
                <td>
                  {(() => {
                    const doc = doctores.find((d) => d.usuario_id === u.doctor);
                    return doc
                      ? `${doc.primer_nombre} ${doc.primer_apellido} - ${doc.especialidad}`
                      : "Sin asignar";
                  })()}
                </td>
                <td>
                  <span
                    className={`badge ${
                      u.activo ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {u.activo ? "Activa" : "Inactiva"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openModal(u)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No se encontraron unidades.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editing ? "Editar Unidad" : "Nueva Unidad"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <UnidadForm
                form={form}
                doctores={doctores}
                validated={validated}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={closeModal}
                onDelete={editing ? () => handleDelete(editing) : null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
