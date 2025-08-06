import React, { useEffect, useState } from 'react';
import { obtenerLecturas } from '../../api/libros';
import { useNavigate } from 'react-router-dom';

const MisLecturas = () => {
  const [lecturas, setLecturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecturas = async () => {
      try {
        const data = await obtenerLecturas();
        setLecturas(data);
      } catch (error) {
        console.error("Error al cargar lecturas", error);
      }
    };

    fetchLecturas();
  }, []);

  const handleEditar = (lectura) => {
    localStorage.setItem('lectura_a_editar', JSON.stringify(lectura));
    navigate(`/editar-lectura/${lectura.id}`);
  };

  const handleVer = (lectura) => {
    localStorage.setItem('lectura_a_ver', JSON.stringify(lectura));
    navigate(`/ver-lectura/${lectura.id}`);
  };

  return (
    <div>
      <h2>📚 Mis lecturas</h2>
      {lecturas.length === 0 ? (
        <p>No hay lecturas guardadas.</p>
      ) : (
        <ul>
          {lecturas.map((lectura) => (
            <li key={lectura.id} className="mb-4">
              <img src={lectura.imagen_url} alt={lectura.titulo} width={100} />
              <h4>{lectura.titulo}</h4>
              <p>Autor: {lectura.autor}</p>
              <p>Puntaje: {lectura.puntaje ?? 'N/A'}</p>
              <p>Comentario: {lectura.comentario ?? 'Sin comentarios'}</p>
              <p>Leído por: {lectura.usuario}</p>
              <button className="btn btn-info me-2" onClick={() => handleVer(lectura)}>👁️ Ver</button>
              <button className="btn btn-warning" onClick={() => handleEditar(lectura)}>✏️ Editar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisLecturas;
