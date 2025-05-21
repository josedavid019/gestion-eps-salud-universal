import React from "react";
import { PacienteForm } from "../components/PacienteForm";

/**
 * Página de registro de pacientes.
 * Contiene el formulario para que nuevos pacientes se registren en el sistema.
 */
export function Registrar() {
  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <PacienteForm />
    </div>
  );
}
