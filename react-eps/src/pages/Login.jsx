import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { loginUsuario } from "../api/usuarios.api";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await loginUsuario(data);
      login(response.data);
      // Guardar token en localStorage
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      toast.success("Inicio de sesión exitoso", {
        position: "bottom-right",
        style: {
          background: "#0d6efd",
          color: "#fff",
        },
      });
      // Verificar y redirigir según el rol
      const roleName = response.data.role;
      if (roleName === "paciente") {
        navigate("/home");
      } else if (roleName === "doctor") {
        navigate("/doctor");
      } else if (roleName === "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})
          .flat()
          .join(" ") ||
        "Error al iniciar sesión";

      toast.error(`Error: ${msg}`, {
        position: "bottom-right",
        style: {
          background: "#dc3545",
          color: "#fff",
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded shadow-sm border mt-5 mx-auto"
      style={{ maxWidth: "400px" }}
      autoComplete="off"
    >
      <h2 className="mb-4 text-center">Iniciar Sesion</h2>

      {/* Identificación */}
      <div className="mb-3">
        <label htmlFor="identificacion" className="form-label">
          Identificación
        </label>
        <input
          id="identificacion"
          className="form-control"
          type="text"
          autoFocus
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

      {/* Contraseña */}
      <div className="mb-3">
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
          <div className="text-danger small">{errors.password.message}</div>
        )}
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </div>

      <div className="text-center mt-3">
        <small className="text-muted">
          ¿No tienes cuenta?{" "}
          <Link to="/registrar" className="text-decoration-none fw-semibold">
            Regístrate aquí
          </Link>
        </small>
      </div>
    </form>
  );
}
