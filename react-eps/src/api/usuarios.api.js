import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/usuarios/api/",
});

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
