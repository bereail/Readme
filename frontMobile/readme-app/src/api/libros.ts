// src/api/libros.ts
import { Platform } from "react-native";

const BASE =
  Platform.OS === "android" ? "http://10.0.2.2:8000" : "http://127.0.0.1:8000";

export type Libro = {
  id: string;
  title: string;
  author?: string;
  year?: string | number;
  coverUrl?: string;
};

export async function getLibrosInicio(): Promise<Libro[]> {
  const url = `${BASE}/libros-inicio`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export async function buscarLibros(titulo: string): Promise<Libro[]> {
  const url = `${BASE}/buscar-libros?titulo=${encodeURIComponent(titulo)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : [];
}
