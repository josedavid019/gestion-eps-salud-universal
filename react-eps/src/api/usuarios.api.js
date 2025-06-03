import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/usuarios/api/",
});

export const getAllUsers = async () => usuariosApi.get("usuarios/");

export const registrarUsuario = async (usuario) =>
  usuariosApi.post("registrar/", usuario);

export const loginUsuario = async (usuario) =>
  usuariosApi.post("login/", usuario);

export const getDoctoresPorUnidad = async (unidadId) =>
  usuariosApi.get(`doctores/?unidad_id=${unidadId}`);

export const getJornadaDoctor = async (doctorId) =>
  usuariosApi.get(`doctores/${doctorId}/jornada/`);

export const getDoctorPorUnidad = async (unidadId) =>
  usuariosApi.get(`unidades/${unidadId}/doctor/`);

export const getPacientes = async () => usuariosApi.get("pacientes/");

export const actualizarPaciente = async (usuario_id, paciente) =>
  usuariosApi.put(`perfil/${usuario_id}/`, paciente);

export const eliminarPaciente = async (usuario_id) =>
  usuariosApi.delete(`usuarios/${usuario_id}/`);

export const getDoctores = async () => usuariosApi.get("listar-doctores/");

export const actualizarDoctor = async (doctor_id, doctor) =>
  usuariosApi.put(`doctores/${doctor_id}/`, doctor);

export const eliminarDoctor = async (doctor_id) =>
  usuariosApi.delete(`usuarios/${doctor_id}/`);
