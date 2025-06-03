export function guardarTokens({ access, refresh }) {
  localStorage.setItem("token", access);
  localStorage.setItem("refresh", refresh);
}
