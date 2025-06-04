import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const PROFILE_FIELDS = [
  "identificacion",
  "primer_nombre",
  "segundo_nombre",
  "primer_apellido",
  "segundo_apellido",
  "genero",
  "fecha_nacimiento",
  "email",
  "direccion",
  "telefono",
];

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || user?.usuario_id;
  const userRole = user?.role;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/usuarios/api/perfil/${userId}/`
        );
        PROFILE_FIELDS.forEach((field) => setValue(field, data[field]));
      } catch {
        toast.error("Error al cargar datos del perfil");
      }
    };

    fetchProfile();
  }, [userId, setValue]);

  const redirectByRole = (role) => {
    switch (role) {
      case "paciente":
        navigate("/home");
        break;
      case "doctor":
        navigate("/doctor");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        navigate("/login");
    }
  };

  const onSubmit = async (data) => {
    const updatedData = {
      email: data.email,
      direccion: data.direccion,
      telefono: data.telefono,
    };

    if (data.password) {
      updatedData.password = data.password;
      updatedData.confirmar_password = data.confirmar_password || "";
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/usuarios/api/perfil/${userId}/`,
        updatedData
      );
      toast.success("Perfil actualizado correctamente");
      redirectByRole(userRole);
    } catch (error) {
      const msg =
        error.response?.data?.detail || "Error al actualizar el perfil";
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-light rounded shadow border mx-auto"
        style={{ maxWidth: "600px" }}
        autoComplete="off"
      >
        <h2 className="mb-4 text-center text-primary">Editar Perfil</h2>

        <h5 className="mt-3 mb-2 text-secondary border-bottom pb-1">
          Información Personal
        </h5>
        <div className="row">
          {[
            ["Identificación", "identificacion"],
            ["Primer Nombre", "primer_nombre"],
            ["Segundo Nombre", "segundo_nombre"],
            ["Primer Apellido", "primer_apellido"],
            ["Segundo Apellido", "segundo_apellido"],
            ["Género", "genero"],
            ["Fecha de Nacimiento", "fecha_nacimiento", "date"],
          ].map(([label, name, type = "text"]) => (
            <div className="mb-3 col-md-6" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                className="form-control"
                disabled
                {...register(name)}
              />
            </div>
          ))}
        </div>

        <h5 className="mt-4 mb-2 text-secondary border-bottom pb-1">
          Datos de Contacto
        </h5>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            className="form-control"
            type="email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <div className="text-danger small">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección <span className="text-danger">*</span>
          </label>
          <input
            id="direccion"
            className="form-control"
            type="text"
            {...register("direccion", {
              required: "La dirección es requerida",
            })}
          />
          {errors.direccion && (
            <div className="text-danger small">{errors.direccion.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono <span className="text-danger">*</span>
          </label>
          <input
            id="telefono"
            className="form-control"
            type="text"
            {...register("telefono", { required: "El teléfono es requerido" })}
          />
          {errors.telefono && (
            <div className="text-danger small">{errors.telefono.message}</div>
          )}
        </div>

        <h5 className="mt-4 mb-2 text-secondary border-bottom pb-1">
          Cambiar Contraseña
        </h5>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Nueva Contraseña
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <div className="text-danger small">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmar_password" className="form-label">
            Confirmar Contraseña
          </label>
          <input
            id="confirmar_password"
            className="form-control"
            type="password"
            {...register("confirmar_password", {
              validate: (value) =>
                !watch("password") ||
                value === watch("password") ||
                "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmar_password && (
            <div className="text-danger small">
              {errors.confirmar_password.message}
            </div>
          )}
        </div>

        <div className="d-grid mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
