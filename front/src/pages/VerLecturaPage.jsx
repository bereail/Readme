// VerLecturaPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerLecturaPorId } from '../api/libros'; // Este endpoint lo harás en el backend

const VerLecturaPage = () => {
  const { id } = useParams();
  const [lectura, setLectura] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectura = async () => {
      try {
        const data = await obtenerLecturaPorId(id);
        setLectura(data);
      } catch (err) {
        setError('No se encontró la lectura seleccionada.');
      }
    };

    fetchLectura();
  }, [id]);

  if (error) return <p>⚠️ {error}</p>;
  if (!lectura) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h2>📖 Detalles de la Lectura</h2>
      <img src={lectura.imagen_url} alt={lectura.titulo} width={150} />
      <h3>{lectura.titulo}</h3>
      <p><strong>Autor:</strong> {lectura.autor}</p>
      <p><strong>Fecha de inicio:</strong> {lectura.fecha_inicio || 'N/A'}</p>
      <p><strong>Fecha de fin:</strong> {lectura.fecha_fin || 'N/A'}</p>
      <p><strong>Lugar:</strong> {lectura.lugar_fin || 'N/A'}</p>
      <p><strong>Puntaje:</strong> {lectura.puntaje || 'N/A'}</p>
      <p><strong>Comentario:</strong> {lectura.comentario || 'Ninguno'}</p>
    </div>
  );
};

export default VerLecturaPage;