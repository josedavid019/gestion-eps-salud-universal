import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { getCitas, getConsultaPorCita } from "../api/citas.api";
import { useAuth } from "../context/AuthContext";
import { ModalCita } from "../components/ModalCita";

export function DoctorHome() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  const [selectedCita, setSelectedCita] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [consultaExistente, setConsultaExistente] = useState(null);

  const fetchCitas = async () => {
    if (!user) return;

    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const doctorId = user.usuario_id;

      const res = await getCitas();
      const citas = res.data;

      const citasHoyDoctor = citas
        .filter(
          (cita) =>
            cita.fecha_cita === today &&
            cita.doctor &&
            cita.doctor.usuario_id === doctorId
        )
        .sort((a, b) => a.hora_cita.localeCompare(b.hora_cita));

      setAppointments(citasHoyDoctor);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, [user]);

  const agendadaCount = appointments.filter(
    (a) => a.estado === "agendada"
  ).length;
  const atendidaCount = appointments.filter(
    (a) => a.estado === "atendida"
  ).length;
  const noAtendidaCount = appointments.filter(
    (a) => a.estado === "no_atendida"
  ).length;

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case "agendada":
        return "Agendada";
      case "atendida":
        return "Atendida";
      case "no_atendida":
        return "No Atendida";
      default:
        return estado;
    }
  };

  const handleVerClick = async (cita) => {
    setSelectedCita(cita);
    setShowModal(true);

    try {
      const res = await getConsultaPorCita(cita.cita_id);
      if (res.data.length > 0) {
        setConsultaExistente(res.data[0]);
      } else {
        setConsultaExistente(null);
      }
    } catch (error) {
      console.error("Error buscando consulta:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCita(null);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Agenda del Día</h2>
      <div className="mb-3">
        <span className="badge bg-primary me-2">
          Agendadas: {agendadaCount}
        </span>
        <span className="badge bg-success me-2">
          Atendidas: {atendidaCount}
        </span>
        <span className="badge bg-danger">No Atendidas: {noAtendidaCount}</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Identificación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <>
              {appointments.map((a) => (
                <tr
                  key={a.cita_id}
                  className={
                    a.estado === "atendida"
                      ? "table-success"
                      : a.estado === "no_atendida"
                      ? "table-danger"
                      : ""
                  }
                >
                  <td>{a.fecha_cita}</td>
                  <td>{a.hora_cita}</td>
                  <td>
                    {a.usuario.primer_nombre} {a.usuario.primer_apellido}
                  </td>
                  <td>{a.usuario.identificacion}</td>
                  <td>{getEstadoLabel(a.estado)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleVerClick(a)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No hay citas programadas para hoy.
                  </td>
                </tr>
              )}
            </>
          </tbody>
        </table>
      </div>

      {selectedCita && (
        <ModalCita
          cita={selectedCita}
          show={showModal}
          handleClose={handleCloseModal}
          refetchCitas={fetchCitas}
          consultaExistente={consultaExistente}
        />
      )}
    </div>
  );
}
