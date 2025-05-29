import axios from "axios";

const unidadesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/unidades/api/",
});

export const getUnidades = async () => unidadesApi.get("unidades/");

export const getUnidadesConDoctores = async () => unidadesApi.get("doctores/");
