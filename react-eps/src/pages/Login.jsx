import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "../utils/toastConfig";
import { loginUsuario } from "../api/usuarios.api";
import { useAuth } from "../context/AuthContext";
import { guardarTokens } from "../utils/localStorage";
import { FormLogin } from "../components/FormLogin";

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
      guardarTokens(response.data);
      successToast("Inicio de sesión exitoso");
      redirigirPorRol(response.data.role, navigate);
    } catch (error) {
      const msg =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})
          .flat()
          .join(" ") ||
        "Error al iniciar sesión";
      errorToast(msg);
    }
  };

  return (
    <FormLogin
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
}

function redirigirPorRol(role, navigate) {
  const rutas = {
    paciente: "/home",
    doctor: "/doctor",
    admin: "/admin",
  };
  navigate(rutas[role] || "/login");
}
