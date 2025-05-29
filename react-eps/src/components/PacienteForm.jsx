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

  // Expresiones regulares para nombres y apellidos
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  /**
   * Envía los datos del formulario al backend.
   * Muestra toast de éxito o error según la respuesta.
   */
  const onSubmit = async (data) => {
    try {
      await registrarUsuario({ ...data, role: 1 }); // role fijo para paciente
      toast.success("!Registrado con éxito!", {
        position: "bottom-right",
        style: {
          background: "#0d6efd",
          color: "#fff",
        },
      });
      navigate("/login");
    } catch (error) {
      const responseData = error.response?.data;
      const mensajeError = responseData
        ? Object.values(responseData).flat().join(" ")
        : "Error inesperado al conectar con el servidor.";
      toast.error(`Error: ${mensajeError}`, {
        position: "bottom-right",
        style: {
          background: "#dc3545",
          color: "#fff",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="mb-4 text-center">Registro de Paciente</h2>

      {/* Identificación */}
      <div className="mb-3">
        <label htmlFor="identificacion" className="form-label">
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
          <span className="text-danger">{errors.identificacion.message}</span>
        )}
      </div>

      {/* Nombres */}
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="primer_nombre" className="form-label">
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
            <span className="text-danger">{errors.primer_nombre.message}</span>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="segundo_nombre" className="form-label">
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
            <span className="text-danger">{errors.segundo_nombre.message}</span>
          )}
        </div>
      </div>

      {/* Apellidos */}
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="primer_apellido" className="form-label">
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
            <span className="text-danger">
              {errors.primer_apellido.message}
            </span>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="segundo_apellido" className="form-label">
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
            <span className="text-danger">
              {errors.segundo_apellido.message}
            </span>
          )}
        </div>
      </div>

      {/* Edad y afiliación */}
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="fecha_nacimiento" className="form-label">
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
            <span className="text-danger">
              {errors.fecha_nacimiento.message}
            </span>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="afiliacion" className="form-label">
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
            <span className="text-danger">{errors.afiliacion.message}</span>
          )}
        </div>
      </div>

      {/* Genero y telefono */}
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="genero" className="form-label">
            Genero
          </label>
          <select
            id="genero"
            className="form-select"
            {...register("genero", {
              required: "Genero es requerido",
            })}
          >
            <option value="">Seleccione...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          {errors.genero && (
            <span className="text-danger">{errors.genero.message}</span>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input
            id="telefono"
            className="form-control"
            type="tel"
            {...register("telefono", {
              required: "Telefono es requerido",
              pattern: {
                value: /^\d{10}$/,
                message: "Solo números",
              },
            })}
          />
          {errors.telefono && (
            <span className="text-danger">{errors.telefono.message}</span>
          )}
        </div>
      </div>

      {/* Dirección */}
      <div className="mb-3">
        <label htmlFor="direccion" className="form-label">
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
          <span className="text-danger">{errors.direccion.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          className="form-control"
          type="email"
          {...register("email", {
            required: "Email es requerido",
          })}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </div>

      {/* Contraseña y confirmación */}
      <div className="row">
        <div className="col mb-3">
          <label htmlFor="password" className="form-label">
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
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="password_confirmation" className="form-label">
            Confirmar contraseña
          </label>
          <input
            id="password_confirmation"
            className="form-control"
            type="password"
            {...register("password_confirmation", {
              required: "Confirmar contraseña es requerido",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          {errors.password_confirmation && (
            <span className="text-danger">
              {errors.password_confirmation.message}
            </span>
          )}
        </div>
      </div>

      {/* Fecha de ingreso */}
      <div className="mb-3">
        <label htmlFor="fecha_ingreso" className="form-label">
          Fecha de ingreso
        </label>
        <input
          id="fecha_ingreso"
          className="form-control"
          type="date"
          {...register("fecha_ingreso", {
            required: "Fecha de ingreso es requerida",
            validate: (value) =>
              new Date(value) <= new Date() || "La fecha no puede ser futura",
          })}
        />
        {errors.fecha_ingreso && (
          <span className="text-danger">{errors.fecha_ingreso.message}</span>
        )}
      </div>

      {/* Botón de envío */}
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </div>

      {/* Enlace de inicio de sesión */}
      <div className="text-center mt-3">
        <p className="text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-decoration-none text-primary fw-semibold"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </form>
  );
}
