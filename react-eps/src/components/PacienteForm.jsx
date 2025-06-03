import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { registrarUsuario } from "../api/usuarios.api";

export function PacienteForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  const onSubmit = async (data) => {
    try {
      await registrarUsuario({ ...data, role: 1 });
      toast.success("¡Registrado con éxito!", {
        position: "bottom-right",
        style: { background: "#0d6efd", color: "#fff" },
      });
      navigate("/login");
    } catch (error) {
      const responseData = error.response?.data;
      const mensajeError = responseData
        ? Object.values(responseData).flat().join(" ")
        : "Error inesperado al conectar con el servidor.";
      toast.error(`Error: ${mensajeError}`, {
        position: "bottom-right",
        style: { background: "#dc3545", color: "#fff" },
      });
    }
  };

  return (
    <div className="container my-5">
      <div
        className="card mx-auto shadow-lg border-0"
        style={{ maxWidth: "800px" }}
      >
        <div className="card-body p-4">
          <h3 className="text-center text-primary fw-bold mb-4">
            Registro de Paciente
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Identificación */}
            <div className="mb-3">
              <label
                htmlFor="identificacion"
                className="form-label"
                style={{ fontSize: "1.1rem" }}
              >
                Identificación
              </label>
              <input
                id="identificacion"
                className="form-control"
                type="number"
                {...register("identificacion", {
                  required: "Identificación es requerida",
                })}
              />
              {errors.identificacion && (
                <div className="text-danger small">
                  {errors.identificacion.message}
                </div>
              )}
            </div>

            {/* Nombres */}
            <div className="row">
              <div className="col mb-3">
                <label
                  htmlFor="primer_nombre"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Primer nombre
                </label>
                <input
                  id="primer_nombre"
                  className="form-control"
                  type="text"
                  {...register("primer_nombre", {
                    required: "Primer nombre es requerido",
                    pattern: {
                      value: nombreRegex,
                      message: "Solo letras permitidas",
                    },
                  })}
                />
                {errors.primer_nombre && (
                  <div className="text-danger small">
                    {errors.primer_nombre.message}
                  </div>
                )}
              </div>
              <div className="col mb-3">
                <label
                  htmlFor="segundo_nombre"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Segundo nombre
                </label>
                <input
                  id="segundo_nombre"
                  className="form-control"
                  type="text"
                  {...register("segundo_nombre", {
                    pattern: {
                      value: nombreRegex,
                      message: "Solo letras permitidas",
                    },
                  })}
                />
                {errors.segundo_nombre && (
                  <div className="text-danger small">
                    {errors.segundo_nombre.message}
                  </div>
                )}
              </div>
            </div>

            {/* Apellidos */}
            <div className="row">
              <div className="col mb-3">
                <label
                  htmlFor="primer_apellido"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Primer apellido
                </label>
                <input
                  id="primer_apellido"
                  className="form-control"
                  type="text"
                  {...register("primer_apellido", {
                    required: "Primer apellido es requerido",
                    pattern: {
                      value: nombreRegex,
                      message: "Solo letras permitidas",
                    },
                  })}
                />
                {errors.primer_apellido && (
                  <div className="text-danger small">
                    {errors.primer_apellido.message}
                  </div>
                )}
              </div>
              <div className="col mb-3">
                <label
                  htmlFor="segundo_apellido"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Segundo apellido
                </label>
                <input
                  id="segundo_apellido"
                  className="form-control"
                  type="text"
                  {...register("segundo_apellido", {
                    pattern: {
                      value: nombreRegex,
                      message: "Solo letras permitidas",
                    },
                  })}
                />
                {errors.segundo_apellido && (
                  <div className="text-danger small">
                    {errors.segundo_apellido.message}
                  </div>
                )}
              </div>
            </div>

            {/* Fecha nacimiento y afiliación */}
            <div className="row">
              <div className="col mb-3">
                <label
                  htmlFor="fecha_nacimiento"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="fecha_nacimiento"
                  className="form-control"
                  type="date"
                  {...register("fecha_nacimiento", {
                    required: "Fecha de nacimiento es requerida",
                  })}
                />
                {errors.fecha_nacimiento && (
                  <div className="text-danger small">
                    {errors.fecha_nacimiento.message}
                  </div>
                )}
              </div>
              <div className="col mb-3">
                <label
                  htmlFor="afiliacion"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Tipo de afiliación
                </label>
                <select
                  id="afiliacion"
                  className="form-select"
                  {...register("afiliacion", {
                    required: "Tipo de afiliación es requerido",
                  })}
                >
                  <option value="">Seleccione...</option>
                  <option value="1">Contributivo</option>
                  <option value="2">Subsidiado</option>
                  <option value="3">Especial</option>
                  <option value="4">Vinculado</option>
                </select>
                {errors.afiliacion && (
                  <div className="text-danger small">
                    {errors.afiliacion.message}
                  </div>
                )}
              </div>
            </div>

            {/* Genero y Teléfono */}
            <div className="row">
              <div className="col mb-3">
                <label
                  htmlFor="genero"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Género
                </label>
                <select
                  id="genero"
                  className="form-select"
                  {...register("genero", { required: "Género es requerido" })}
                >
                  <option value="">Seleccione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
                {errors.genero && (
                  <div className="text-danger small">
                    {errors.genero.message}
                  </div>
                )}
              </div>
              <div className="col mb-3">
                <label
                  htmlFor="telefono"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Teléfono
                </label>
                <input
                  id="telefono"
                  className="form-control"
                  type="tel"
                  {...register("telefono", {
                    required: "Teléfono es requerido",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Solo números (10 dígitos)",
                    },
                  })}
                />
                {errors.telefono && (
                  <div className="text-danger small">
                    {errors.telefono.message}
                  </div>
                )}
              </div>
            </div>

            {/* Dirección */}
            <div className="mb-3">
              <label
                htmlFor="direccion"
                className="form-label"
                style={{ fontSize: "1.05rem" }}
              >
                Dirección
              </label>
              <input
                id="direccion"
                className="form-control"
                type="text"
                {...register("direccion", {
                  required: "Dirección es requerida",
                  minLength: { value: 5, message: "Muy corta" },
                })}
              />
              {errors.direccion && (
                <div className="text-danger small">
                  {errors.direccion.message}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label"
                style={{ fontSize: "1.05rem" }}
              >
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                {...register("email", { required: "Email es requerido" })}
              />
              {errors.email && (
                <div className="text-danger small">{errors.email.message}</div>
              )}
            </div>

            {/* Contraseña y Confirmación */}
            <div className="row">
              <div className="col mb-3">
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  {...register("password", {
                    required: "Contraseña es requerida",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  })}
                />
                {errors.password && (
                  <div className="text-danger small">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="col mb-3">
                <label
                  htmlFor="password_confirmation"
                  className="form-label"
                  style={{ fontSize: "1.05rem" }}
                >
                  Confirmar contraseña
                </label>
                <input
                  id="password_confirmation"
                  className="form-control"
                  type="password"
                  {...register("password_confirmation", {
                    required: "Confirmar contraseña es requerido",
                    validate: (value) =>
                      value === watch("password") ||
                      "Las contraseñas no coinciden",
                  })}
                />
                {errors.password_confirmation && (
                  <div className="text-danger small">
                    {errors.password_confirmation.message}
                  </div>
                )}
              </div>
            </div>

            {/* Fecha de ingreso */}
            <div className="mb-3">
              <label
                htmlFor="fecha_ingreso"
                className="form-label"
                style={{ fontSize: "1.05rem" }}
              >
                Fecha de ingreso
              </label>
              <input
                id="fecha_ingreso"
                className="form-control"
                type="date"
                {...register("fecha_ingreso", {
                  required: "Fecha de ingreso es requerida",
                  validate: (value) =>
                    new Date(value) <= new Date() ||
                    "La fecha no puede ser futura",
                })}
              />
              {errors.fecha_ingreso && (
                <div className="text-danger small">
                  {errors.fecha_ingreso.message}
                </div>
              )}
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>

            <div className="text-center">
              <small className="text-muted">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-decoration-none fw-semibold text-primary"
                >
                  Iniciar sesión
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
