// src/api/libros.js

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const buscarLibros = (query) =>
  axios.get(`${BASE_URL}/buscar-libros/${query}/`);

export const guardarLibro = (data) =>
  axios.post(`${BASE_URL}/guardar-libro/`, data);

export const guardarLectura = (data) =>
  axios.post(`${BASE_URL}/guardar-lectura/`, data);

export const obtenerLecturas = () =>
  axios.get(`${BASE_URL}/lecturas/`)
    .then(response => response.data)
    .catch(error => {
      console.error("❌ Error al obtener lecturas", error);
      throw error;
    });

export const obtenerLecturaPorId = async (id) => {
  const response = await fetch(`http://localhost:8000/api/libro/${id}/`);
  if (!response.ok) throw new Error('Lectura no encontrada');
  return await response.json();
};

export const actualizarLectura = async (id, datos) => {
  const res = await fetch(`http://localhost:8000/api/libro/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Error al actualizar");
  return res.json();
};