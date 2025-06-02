import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/pacientes/api/",
});

export const getAfiliaciones = async () => usuariosApi.get("afiliaciones/");
