import axios from "axios";
import { Platform } from "react-native";

// Tomar de env y hacer fallback por plataforma
const FALLBACK =
  Platform.OS === "android" ? "http://10.0.2.2:8000/api" : "http://127.0.0.1:8000/api";

const BASE_URL =
  (process.env.EXPO_PUBLIC_API_URL as string | undefined) ?? FALLBACK;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Endpoints (equivalentes al web)
export const buscarLibros = (query: string) =>
  api.get(`/buscar-libros/${encodeURIComponent(query)}/`);

export const guardarLibro = (data: any) =>
  api.post(`/guardar-libro/`, data);

export const guardarLectura = (data: any) =>
  api.post(`/guardar-lectura/`, data);

export const obtenerLecturas = async () => {
  const r = await api.get(`/lecturas/`);
  return r.data;
};

// Estos dos en tu web usaban fetch con localhost. Los portamos a axios/baseURL:
export const obtenerLecturaPorId = async (id: string | number) => {
  const r = await api.get(`/libro/${id}/`);
  return r.data;
};

export const actualizarLectura = async (id: string | number, datos: any) => {
  const r = await api.put(`/libro/${id}/`, datos);
  return r.data;
};
