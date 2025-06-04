import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { getCitas, getConsultaPorCita } from "../../api/citas.api";
import { useAuth } from "../../context/AuthContext";
import { ModalCita } from "../../components/ModalCita";

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
      setConsultaExistente(res.data.length > 0 ? res.data[0] : null);
    } catch (error) {
      console.error("Error buscando consulta:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCita(null);
  };

  return (
    <div className="container my-5">
      <h2 className="text-primary mb-4 text-center">Agenda del Día</h2>

      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-primary">Agendadas</span>
          <span className="fw-semibold text-primary">{agendadaCount}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success">Atendidas</span>
          <span className="fw-semibold text-success">{atendidaCount}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-danger">No Atendidas</span>
          <span className="fw-semibold text-danger">{noAtendidaCount}</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle table-hover shadow-sm">
          <thead className="table-light">
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
            {appointments.length > 0 ? (
              appointments.map((a) => (
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
                  <td>
                    <span
                      className={`badge ${
                        a.estado === "agendada"
                          ? "bg-primary"
                          : a.estado === "atendida"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {getEstadoLabel(a.estado)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleVerClick(a)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  <i className="bi bi-calendar-x fs-3"></i>
                  <br />
                  No hay citas programadas para hoy.
                </td>
              </tr>
            )}
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
