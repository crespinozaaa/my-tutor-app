import axios from "axios";
import { getToken, clearSession } from "../lib/session";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000", // usa variable .env si existe
});

// Interceptor: agrega token a todas las peticiones
http.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: maneja errores 401 (sesión expirada)
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await clearSession();
      window.location.href = "/login"; // redirige si expira la sesión
    }
    return Promise.reject(error);
  }
);

export default http;
