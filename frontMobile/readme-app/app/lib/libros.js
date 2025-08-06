// lib/libros.js

import axios from 'axios';

const BASE_URL = 'http://192.168.100.21:8000/api'; // Tu IP local real

export const buscarLibros = (query) =>
  axios.get(`${BASE_URL}/buscar-libros/${query}/`);

export const guardarLibro = (data) =>
  axios.post(`${BASE_URL}/guardar-libro/`, data);

export const guardarLectura = (data) =>
  axios.post(`${BASE_URL}/guardar-lectura/`, data);

export const obtenerLecturas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lecturas/`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener lecturas:", error);
    throw error;
  }
};

export const obtenerLecturaPorId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/libro/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al obtener lectura con ID ${id}:`, error);
    throw error;
  }
};

export const actualizarLectura = async (id, datos) => {
  try {
    const response = await axios.put(`${BASE_URL}/libro/${id}/`, datos);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al actualizar lectura con ID ${id}:`, error);
    throw error;
  }
};
