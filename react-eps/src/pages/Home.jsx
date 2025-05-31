// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCitasPorPaciente } from "../api/citas.api";
import { toast } from "react-hot-toast";

export function Home() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [avisos] = useState([
    "Recuerda actualizar tus datos personales.",
    "Vacunación contra la influenza disponible en todas las unidades.",
  ]);

  useEffect(() => {
    if (!user?.id && !user?.usuario_id) return;

    const userId = user?.id || user?.usuario_id;

    const fetchCitas = async () => {
      try {
        const res = await getCitasPorPaciente(userId);
        const citasFuturas = res.data.filter((cita) => {
          const fechaHoy = new Date();
          const fechaCita = new Date(`${cita.fecha_cita}T${cita.hora_cita}`);
          return fechaCita >= fechaHoy && cita.estado !== "cancelada";
        });
        setCitas(citasFuturas);
      } catch (error) {
        console.error("Error al cargar citas del paciente:", error);
        toast.error("No se pudieron cargar tus citas.");
      }
    };

    fetchCitas();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">¡Bienvenido, {user?.nombres || "Paciente"}!</h2>

      {/* Próximas Citas */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">Próximas citas</div>
        <ul className="list-group list-group-flush">
          {citas.length > 0 ? (
            citas.map((cita, idx) => (
              <li key={idx} className="list-group-item">
                <strong>Fecha:</strong>{" "}
                {new Date(cita.fecha_cita).toLocaleDateString("es-ES")} —{" "}
                <strong>Hora:</strong> {cita.hora_cita} —{" "}
                <strong>Doctor:</strong>{" "}
                {cita.doctor
                  ? `${cita.doctor.primer_nombre} ${cita.doctor.primer_apellido}`
                  : "Sin asignar"}{" "}
                — <strong>Unidad:</strong>{" "}
                {cita.unidad?.nombre || "No especificada"}
              </li>
            ))
          ) : (
            <li className="list-group-item">
              No tienes citas programadas próximamente.
            </li>
          )}
        </ul>
      </div>

      {/* Avisos */}
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
  );
}
