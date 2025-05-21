import axios from "axios";

// Instancia de Axios configurada para las rutas de paciente
const pacienteApi = axios.create({
  baseURL: "http://localhost:8000/pacientes/api/",
});

export const registrarPaciente = async (paciente) =>
  pacienteApi.post("registrar/", paciente);
