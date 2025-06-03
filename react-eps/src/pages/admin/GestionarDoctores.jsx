// src/pages/GestionarDoctores.jsx
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  getDoctores,
  actualizarDoctor,
  registrarUsuario,
  eliminarDoctor,
} from "../../api/usuarios.api";

export function GestionarDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [filter, setFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});

  async function fetchDoctores() {
    try {
      const response = await getDoctores();
      let data = response.data;
      if (Array.isArray(data)) {
        data = data.map(normalizarDoctor);
        setDoctores(data);
      } else {
        setDoctores([]);
      }
    } catch (error) {
      console.error("Error cargando doctores:", error);
      setDoctores([]);
    }
  }

  useEffect(() => {
    fetchDoctores();
  }, []);

  const normalizarDoctor = (doc) => {
    if (!doc.usuario_id) {
      console.warn("Doctor sin usuario_id, no se puede normalizar:", doc);
    }

    return {
      ...doc,
      jornada:
        doc.jornada === "Matinal" || doc.jornada === 1 || doc.jornada === "1"
          ? 1
          : 2,
      fecha_nacimiento: doc.fecha_nacimiento
        ? dayjs(doc.fecha_nacimiento).format("YYYY-MM-DD")
        : "",
      fecha_ingreso: doc.fecha_ingreso
        ? dayjs(doc.fecha_ingreso).format("YYYY-MM-DD")
        : "",
    };
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return "";
    return dayjs().diff(dayjs(fechaNacimiento), "year");
  };

  const openModal = (doctor) => {
    setForm({ ...doctor, password: "" });
    setIsEditing(true);
    setModalOpen(true);
  };

  const openNuevoModal = () => {
    setForm({
      identificacion: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      genero: "",
      email: "",
      direccion: "",
      telefono: "",
      fecha_nacimiento: "",
      especialidad: "",
      fecha_ingreso: "",
      jornada: 1,
      password: "",
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.classList.add("was-validated");
      return;
    }

    let formToSend = { ...form };

    if (formToSend.hasOwnProperty("unidad")) {
      delete formToSend.unidad;
    }

    formToSend.role = 2;

    if (!formToSend.password) {
      delete formToSend.password;
    }

    try {
      if (isEditing) {
        await actualizarDoctor(formToSend.usuario_id, formToSend);
      } else {
        await registrarUsuario(formToSend);
      }
      await fetchDoctores();
      closeModal();
    } catch (error) {
      console.error("Error actualizando doctor:", error);
      alert("Ocurrió un error al actualizar el doctor.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Eliminar este doctor?")) {
      try {
        await eliminarDoctor(form.usuario_id);
        setDoctores((prev) =>
          prev.filter((d) => d.usuario_id !== form.usuario_id)
        );
        closeModal();
      } catch (error) {
        console.error("Error eliminando doctor:", error);
        alert("No se pudo eliminar el doctor. Intenta nuevamente.");
      }
    }
  };

  const filtered = Array.isArray(doctores)
    ? doctores.filter((d) => {
        const nombre = d.primer_nombre ? d.primer_nombre.toLowerCase() : "";
        const apellido = d.primer_apellido
          ? d.primer_apellido.toLowerCase()
          : "";
        const filtro = filter.toLowerCase();
        return nombre.includes(filtro) || apellido.includes(filtro);
      })
    : [];

  return (
    <div className="container my-4">
      <h2 className="mb-4">Gestionar Doctores</h2>
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-success me-3" onClick={openNuevoModal}>
          Nuevo Doctor
        </button>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Filtrar doctores..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Género</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Jornada</th>
              <th>Fecha ingreso</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, index) => {
              return (
                <tr key={d.usuario_id ?? `doctor-${index}`}>
                  <td>{d.identificacion}</td>
                  <td>{d.primer_nombre}</td>
                  <td>{d.primer_apellido}</td>
                  <td>{calcularEdad(d.fecha_nacimiento)}</td>
                  <td>
                    {d.genero === "M"
                      ? "Masculino"
                      : d.genero === "F"
                      ? "Femenino"
                      : d.genero}
                  </td>
                  <td>{d.email}</td>
                  <td>{d.telefono}</td>
                  <td>{d.especialidad}</td>
                  <td>{d.jornada === 1 ? "Matinal" : "Vespertina"}</td>
                  <td>{d.fecha_ingreso}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openModal(d)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form
                onSubmit={handleUpdate}
                noValidate
                className="needs-validation"
              >
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "Detalles del Doctor" : "Nuevo Doctor"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {[
                    {
                      name: "identificacion",
                      label: "Identificación",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "primer_nombre",
                      label: "Primer Nombre",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "segundo_nombre",
                      label: "Segundo Nombre",
                      type: "text",
                      required: false,
                    },
                    {
                      name: "primer_apellido",
                      label: "Primer Apellido",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "segundo_apellido",
                      label: "Segundo Apellido",
                      type: "text",
                      required: false,
                    },
                    {
                      name: "genero",
                      label: "Género",
                      type: "select",
                      options: [
                        { label: "Masculino", value: "M" },
                        { label: "Femenino", value: "F" },
                      ],
                      required: true,
                    },
                    {
                      name: "email",
                      label: "Email",
                      type: "email",
                      required: true,
                    },
                    {
                      name: "telefono",
                      label: "Teléfono",
                      type: "tel",
                      required: true,
                    },
                    {
                      name: "direccion",
                      label: "Dirección",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "fecha_nacimiento",
                      label: "Fecha de Nacimiento",
                      type: "date",
                      required: true,
                    },
                    {
                      name: "especialidad",
                      label: "Especialidad",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "fecha_ingreso",
                      label: "Fecha de Ingreso",
                      type: "date",
                      required: true,
                    },
                    {
                      name: "jornada",
                      label: "Jornada",
                      type: "select",
                      options: ["Matinal", "Vespertina"],
                      required: true,
                    },
                    {
                      name: "password",
                      label: "Contraseña",
                      type: "password",
                      required: !isEditing,
                    },
                  ]
                    .filter((f) => !(isEditing && f.name === "password"))
                    .map((f) => (
                      <div className="mb-3" key={f.name}>
                        <label htmlFor={f.name} className="form-label">
                          {f.label}
                        </label>
                        {f.type === "select" ? (
                          <select
                            className="form-select"
                            id={f.name}
                            name={f.name}
                            value={
                              f.name === "jornada"
                                ? form.jornada === 1
                                  ? "Matinal"
                                  : "Vespertina"
                                : form[f.name] || ""
                            }
                            onChange={(e) => {
                              if (f.name === "jornada") {
                                setForm((prev) => ({
                                  ...prev,
                                  jornada: e.target.value === "Matinal" ? 1 : 2,
                                }));
                              } else {
                                handleChange(e);
                              }
                            }}
                            required={f.required}
                          >
                            <option value="">Seleccione...</option>
                            {f.options.map((opt, i) =>
                              typeof opt === "string" ? (
                                <option key={i} value={opt}>
                                  {opt}
                                </option>
                              ) : (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <input
                            type={f.type}
                            className="form-control"
                            id={f.name}
                            name={f.name}
                            value={form[f.name] || ""}
                            onChange={handleChange}
                            required={f.required}
                            minLength={
                              f.name === "password" && !isEditing
                                ? 6
                                : undefined
                            }
                          />
                        )}
                        <div className="invalid-feedback">
                          Por favor ingrese un valor válido.
                        </div>
                      </div>
                    ))}
                </div>
                <div className="modal-footer">
                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-danger me-auto"
                      onClick={handleDelete}
                    >
                      Eliminar
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Actualizar" : "Registrar"}
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
