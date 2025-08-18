// src/api/libros.ts
import axios from "axios";
import { Platform } from "react-native";

const FALLBACK =
  Platform.OS === "android" ? "http://10.0.2.2:8000" : "http://127.0.0.1:8000";

const BASE_URL =
  (process.env.EXPO_PUBLIC_API_URL as string | undefined) ?? FALLBACK;

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export const buscarLibros = (q: string, limit = 15) =>
  api.get(`/buscar-libros/`, { params: { q, limit } });
