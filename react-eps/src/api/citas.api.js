import axios from "axios";

const citasApi = axios.create({
  baseURL: "http://127.0.0.1:8000/citas/api/",
});

export const getCitas = async () => citasApi.get("citas/");

export const registrarCita = async (cita) => citasApi.post("citas/", cita);

export const getFechasNoDisponibles = async (doctorId) =>
  citasApi.get(`fechas/${doctorId}/`);

export const getHorasOcupadas = async (doctorId, fecha) => {
  const formattedFecha = new Date(fecha).toISOString().split("T")[0];
  return citasApi.get(
    `doctor/${doctorId}/horas-ocupadas/?fecha=${formattedFecha}`
  );
};

export const getCitasPorPaciente = async (usuario_id) =>
  citasApi.get(`paciente/${usuario_id}/`);
