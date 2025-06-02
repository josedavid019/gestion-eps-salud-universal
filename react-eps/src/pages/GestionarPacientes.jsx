import React, { useState, useEffect } from "react";
import {
  getPacientes,
  actualizarPaciente,
  registrarUsuario,
  eliminarPaciente,
} from "../api/usuarios.api";
import { getAfiliaciones } from "../api/pacientes.api";

// Función para calcular edad a partir de fecha de nacimiento YYYY-MM-DD
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "";
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export default function GestionarPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [afiliaciones, setAfiliaciones] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    usuario_id: "",
    identificacion: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    genero: "",
    fecha_nacimiento: "",
    email: "",
    telefono: "",
    direccion: "",
    fecha_ingreso: "",
    afiliacion: "",
    password: "",
  });

  const fetchPacientes = async () => {
    try {
      const response = await getPacientes();
      setPacientes(response.data || []);
    } catch (error) {
      console.error("Error al cargar pacientes:", error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  useEffect(() => {
    const fetchAfiliaciones = async () => {
      try {
        const response = await getAfiliaciones();
        setAfiliaciones(response.data || []);
      } catch (error) {
        console.error("Error al cargar afiliaciones:", error);
      }
    };
    fetchAfiliaciones();
  }, []);

  const openModal = (paciente) => {
    setValidated(false);
    if (paciente) {
      setEditing(paciente.usuario_id);
      setForm({
        usuario_id: paciente.usuario_id,
        identificacion: paciente.identificacion || "",
        primer_nombre: paciente.primer_nombre || "",
        segundo_nombre: paciente.segundo_nombre || "",
        primer_apellido: paciente.primer_apellido || "",
        segundo_apellido: paciente.segundo_apellido || "",
        genero: paciente.genero || "",
        fecha_nacimiento: paciente.fecha_nacimiento || "",
        email: paciente.email || "",
        telefono: paciente.telefono || "",
        direccion: paciente.direccion || "",
        fecha_ingreso: paciente.fecha_ingreso || "",
        afiliacion:
          typeof paciente.afiliacion === "object"
            ? paciente.afiliacion.afiliacion_id || ""
            : paciente.afiliacion || "",
        password: "",
      });
    } else {
      setEditing(null);
      setForm({
        usuario_id: "",
        identificacion: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        genero: "",
        fecha_nacimiento: "",
        email: "",
        telefono: "",
        direccion: "",
        fecha_ingreso: "",
        afiliacion: "",
        password: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const formEl = e.currentTarget;
    e.preventDefault();
    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!editing && !form.password) {
      alert("Por favor, ingresa una contraseña.");
      return;
    }

    setValidated(true);
    setLoading(true);

    try {
      if (editing) {
        const { password, ...dataActualizar } = form;
        await actualizarPaciente(editing, dataActualizar);
        await fetchPacientes(); // recargar
      } else {
        const nuevoPacienteData = {
          ...form,
          role: 1,
        };
        await registrarUsuario(nuevoPacienteData);
        await fetchPacientes(); // recargar
      }
      closeModal();
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      alert("Error al guardar paciente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Eliminar paciente?")) {
      try {
        await eliminarPaciente(editing);
        await fetchPacientes(); // recargar lista
        closeModal();
      } catch (error) {
        console.error("Error al eliminar paciente:", error);
        alert("Error al eliminar paciente.");
      }
    }
  };

  const filtered = pacientes.filter((p) => {
    const id = p?.identificacion?.toLowerCase() || "";
    const nombre = p?.primer_nombre?.toLowerCase() || "";
    const apellido = p?.primer_apellido?.toLowerCase() || "";
    const f = filter.toLowerCase();
    return id.includes(f) || nombre.includes(f) || apellido.includes(f);
  });

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Pacientes</h2>
      <div className="d-flex mb-3 align-items-center">
        <button
          className="btn btn-success me-3"
          onClick={() => openModal(null)}
          disabled={loading}
        >
          Nuevo Paciente
        </button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Filtrar pacientes..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Primer Nombre</th>
              <th>Primer Apellido</th>
              <th>Género</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Fecha Ingreso</th>
              <th>Afiliación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.usuario_id}>
                <td>{p.identificacion}</td>
                <td>{p.primer_nombre}</td>
                <td>{p.primer_apellido}</td>
                <td>{p.genero}</td>
                <td>{calcularEdad(p.fecha_nacimiento)}</td>
                <td>{p.email}</td>
                <td>{p.telefono}</td>
                <td>{p.fecha_ingreso}</td>
                <td>
                  {typeof p.afiliacion === "object"
                    ? p.afiliacion.nombre
                    : afiliaciones.find((a) => a.afiliacion_id === p.afiliacion)
                        ?.nombre || p.afiliacion}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => openModal(p)}
                    disabled={loading}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editing ? "Ver/Editar Paciente" : "Nuevo Paciente"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  disabled={loading}
                ></button>
              </div>
              <form
                noValidate
                className={validated ? "was-validated" : ""}
                onSubmit={handleSubmit}
              >
                <div className="modal-body">
                  {[
                    {
                      name: "identificacion",
                      label: "Identificación",
                      type: "text",
                    },
                    {
                      name: "primer_nombre",
                      label: "Primer Nombre",
                      type: "text",
                    },
                    {
                      name: "segundo_nombre",
                      label: "Segundo Nombre",
                      type: "text",
                      optional: true,
                    },
                    {
                      name: "primer_apellido",
                      label: "Primer Apellido",
                      type: "text",
                    },
                    {
                      name: "segundo_apellido",
                      label: "Segundo Apellido",
                      type: "text",
                      optional: true,
                    },
                    {
                      name: "genero",
                      label: "Género",
                      type: "select",
                      options: [
                        { value: "", text: "Seleccione" },
                        { value: "M", text: "Masculino" },
                        { value: "F", text: "Femenino" },
                        { value: "O", text: "Otro" },
                      ],
                    },
                    {
                      name: "fecha_nacimiento",
                      label: "Fecha de Nacimiento",
                      type: "date",
                    },
                    { name: "email", label: "Email", type: "email" },
                    { name: "telefono", label: "Teléfono", type: "tel" },
                    { name: "direccion", label: "Dirección", type: "text" },
                    {
                      name: "fecha_ingreso",
                      label: "Fecha de Ingreso",
                      type: "date",
                    },
                    {
                      name: "afiliacion",
                      label: "Tipo de Afiliación",
                      type: "select",
                      options: [
                        { value: "", text: "Seleccione" },
                        ...afiliaciones.map((a) => ({
                          value: a.afiliacion_id,
                          text: a.nombre,
                        })),
                      ],
                    },
                  ].map(({ name, label, type, options, optional }) => (
                    <div className="mb-3" key={name}>
                      <label htmlFor={name} className="form-label">
                        {label}
                      </label>
                      {type === "select" ? (
                        <select
                          className="form-select"
                          id={name}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          required={!optional}
                          disabled={loading}
                        >
                          {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.text}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={type}
                          className="form-control"
                          id={name}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          required={!optional}
                          disabled={loading}
                        />
                      )}
                    </div>
                  ))}
                  {!editing && (
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  {editing && (
                    <button
                      type="button"
                      className="btn btn-danger me-auto"
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {editing ? "Guardar Cambios" : "Registrar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
