// src/pages/Home.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user, logout } = useAuth();

  // Mock de citas futuras
  const citas = [
    { fecha: "2025-06-01", hora: "10:00", doctor: "Dr. Juan Pérez" },
    { fecha: "2025-06-10", hora: "15:00", doctor: "Dra. María Gómez" },
  ];

  // Mock de avisos
  const avisos = [
    "Recuerda actualizar tus datos personales.",
    "Vacunación contra la influenza disponible en todas las unidades.",
  ];

  return (
    <div>
      {/* Contenido principal */}
      <div className="container mt-4">
        {/* Bienvenida */}
        <h2 className="mb-4">¡Bienvenido, {user?.nombres || "Paciente"}!</h2>

        {/* Calendario de próximas citas */}
        <div className="card mb-4">
          <div className="card-header bg-info text-white">Próximas citas</div>
          <ul className="list-group list-group-flush">
            {citas.length > 0 ? (
              citas.map((cita, idx) => (
                <li key={idx} className="list-group-item">
                  <strong>Fecha:</strong> {cita.fecha} — <strong>Hora:</strong>{" "}
                  {cita.hora} — <strong>Doctor:</strong> {cita.doctor}
                </li>
              ))
            ) : (
              <li className="list-group-item">No tienes citas programadas.</li>
            )}
          </ul>
        </div>

        {/* Recomendaciones o avisos */}
        {avisos.length > 0 && (
          <div className="card mb-4">
            <div className="card-header bg-warning">Avisos importantes</div>
            <div className="card-body">
              <ul className="mb-0">
                {avisos.map((aviso, idx) => (
                  <li key={idx}>{aviso}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
