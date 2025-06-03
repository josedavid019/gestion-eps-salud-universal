import React from "react";
import { Link } from "react-router-dom";

export function FormLogin({ onSubmit, register, errors, handleSubmit }) {
  return (
    <div className="bg-light py-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{ width: "100%", maxWidth: "420px", marginTop: "40px" }}
      >
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4 text-primary fw-bold">
            Iniciar Sesión
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                className={`form-control ${
                  errors.identificacion ? "is-invalid" : ""
                }`}
                type="text"
                autoFocus
                {...register("identificacion", {
                  required: "Identificación es requerida",
                })}
              />
              {errors.identificacion && (
                <div className="invalid-feedback">
                  {errors.identificacion.message}
                </div>
              )}
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label"
                style={{ fontSize: "1.1rem" }}
              >
                Contraseña
              </label>
              <input
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                type="password"
                {...register("password", {
                  required: "Contraseña es requerida",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>

            <div className="text-center">
              <small className="text-muted">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/registrar"
                  className="text-decoration-none fw-semibold"
                >
                  Regístrate aquí
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
