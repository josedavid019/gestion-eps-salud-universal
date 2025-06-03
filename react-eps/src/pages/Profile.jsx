import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || user?.usuario_id;
  const userRole = user?.role;

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://127.0.0.1:8000/usuarios/api/perfil/${userId}/`)
      .then((res) => {
        const fields = [
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
        fields.forEach((field) => setValue(field, res.data[field]));
      })
      .catch(() => {
        toast.error("Error al cargar datos del perfil");
      });
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    const updatedData = {
      email: data.email,
      direccion: data.direccion,
      telefono: data.telefono,
    };

    if (data.password) {
      updatedData.password = data.password;
      updatedData.confirmar_password = data.confirmar_password || ""; // enviar confirmar_password
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/usuarios/api/perfil/${userId}/`,
        updatedData
      );
      toast.success("Perfil actualizado correctamente");
      if (userRole === "paciente") {
        navigate("/home");
      } else if (userRole === "doctor") {
        navigate("/doctor");
      } else if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded shadow-sm border mt-5 mx-auto"
      style={{ maxWidth: "500px" }}
      autoComplete="off"
    >
      <h2 className="mb-4 text-center">Editar Perfil</h2>

      {/* Campos no editables */}
      <div className="mb-3">
        <label className="form-label">Identificación</label>
        <input
          className="form-control"
          type="text"
          disabled
          {...register("identificacion")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Primer Nombre</label>
        <input
          className="form-control"
          type="text"
          disabled
          {...register("primer_nombre")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Segundo Nombre</label>
        <input
          className="form-control"
          type="text"
          disabled
          {...register("segundo_nombre")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Primer Apellido</label>
        <input
          className="form-control"
          type="text"
          disabled
          {...register("primer_apellido")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Segundo Apellido</label>
        <input
          className="form-control"
          type="text"
          disabled
          {...register("segundo_apellido")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Género</label>
        <input
          className="form-control"
          type="text"
          disabled
          {...register("genero")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento</label>
        <input
          className="form-control"
          type="date"
          disabled
          {...register("fecha_nacimiento")}
        />
      </div>

      {/* Campos editables */}

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
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
          Dirección
        </label>
        <input
          id="direccion"
          className="form-control"
          type="text"
          {...register("direccion", { required: "La dirección es requerida" })}
        />
        {errors.direccion && (
          <div className="text-danger small">{errors.direccion.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">
          Teléfono
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

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Nueva Contraseña (dejar vacío para no cambiar)
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

      {/* Campo confirmar contraseña */}
      <div className="mb-3">
        <label htmlFor="confirmar_password" className="form-label">
          Confirmar Nueva Contraseña
        </label>
        <input
          id="confirmar_password"
          className="form-control"
          type="password"
          {...register("confirmar_password", {
            validate: (value) =>
              !value ||
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

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}
