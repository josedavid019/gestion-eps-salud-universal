import axios from "axios";

const unidadesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/unidades/api/",
});

export const getUnidades = async () => unidadesApi.get("unidades/");

export const getUnidadesConDoctores = async () => unidadesApi.get("doctores/");

export const actualizarUnidad = async (unidad_id, unidad) => {
  return unidadesApi.put(`unidades/${unidad_id}/`, unidad);
};

export const eliminarUnidad = async (unidad_id) => {
  return unidadesApi.delete(`unidades/${unidad_id}/`);
};

export const agregarUnidad = async (unidad) => {
  return unidadesApi.post("unidades/", unidad);
};

export const getUnidadesConDoctor = async () => {
  return unidadesApi.get(`unidades-con-doctor/`);
};
