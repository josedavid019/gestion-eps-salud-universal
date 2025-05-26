import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/usuarios/api/",
});

export const registrarUsuario = async (usuario) =>
  usuariosApi.post("registrar/", usuario);
