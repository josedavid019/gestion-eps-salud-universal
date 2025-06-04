import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCitasPorPaciente } from "../../api/citas.api";
import { toast } from "react-hot-toast";

export function Home() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [avisos] = useState([
    "Recuerda actualizar tus datos personales.",
    "Recuerda no compartir tus datos personales con nadie.",
  ]);

  useEffect(() => {
    if (!user?.id && !user?.usuario_id) return;
    if (citas.length > 0) return;

    const userId = user?.id || user?.usuario_id;

    const fetchCitas = async () => {
      try {
        const res = await getCitasPorPaciente(userId);
        const citasFuturas = res.data.filter((cita) => {
          const fechaHoy = new Date();
          const fechaCita = new Date(`${cita.fecha_cita}T${cita.hora_cita}`);
          return fechaCita >= fechaHoy && cita.estado === "agendada";
        });
        setCitas(citasFuturas);
      } catch (error) {
        console.error("Error al cargar citas del paciente:", error);
        toast.error("No se pudieron cargar tus citas.");
      }
    };

    fetchCitas();
  }, [user]);

  const formatFecha = (fechaStr, horaStr) => {
    const date = new Date(`${fechaStr}T${horaStr}`);
    return new Intl.DateTimeFormat("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderCitas = () => {
    if (citas.length === 0) {
      return (
        <div className="text-center text-muted py-4">
          <i className="bi bi-calendar-x fs-3 mb-2 d-block"></i>
          <p>No tienes citas programadas próximamente.</p>
        </div>
      );
    }

    return citas.map((cita, idx) => (
      <div key={idx} className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-2">
            <i className="bi bi-calendar-check me-2 text-success"></i>
            {formatFecha(cita.fecha_cita, cita.hora_cita)}
          </h5>
          <p className="card-text mb-1">
            <strong>Doctor:</strong>{" "}
            {cita.doctor
              ? `${cita.doctor.primer_nombre} ${cita.doctor.primer_apellido}`
              : "Sin asignar"}
          </p>
          <p className="card-text">
            <strong>Unidad:</strong> {cita.unidad?.nombre || "No especificada"}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="fw-bold">¡Bienvenido, {user?.nombres || "Paciente"}!</h2>
        <p className="text-muted">
          Aquí puedes ver tus próximas citas y avisos importantes.
        </p>
      </div>

      {/* Próximas Citas */}
      <div className="mb-5">
        <h4 className="mb-3 text-primary">🩺 Próximas citas</h4>
        {renderCitas()}
      </div>

      {/* Avisos */}
      {avisos.length > 0 && (
        <div className="card shadow-sm border-warning">
          <div className="card-header bg-warning text-dark fw-bold">
            📢 Avisos importantes
          </div>
          <div className="card-body">
            <ul className="mb-0">
              {avisos.map((aviso, idx) => (
                <li key={idx} className="mb-2">
                  {aviso}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
