// ✅ src/pages/EditarLecturaPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerLecturaPorId, actualizarLectura } from '../api/libros';

const EditarLecturaPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lectura, setLectura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectura = async () => {
      try {
        const data = await obtenerLecturaPorId(id);
        setLectura(data);
      } catch (error) {
        console.error("Error al obtener la lectura", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectura();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectura((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarLectura(id, lectura);
      alert("✅ Lectura actualizada");
      navigate('/mis-lecturas');
    } catch (error) {
      console.error("Error al actualizar la lectura", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!lectura) return <p>No se encontró la lectura</p>;

  return (
    <div className="p-3">
      <h2>✏️ Editar Lectura</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="mb-2">
          <label>Título</label>
          <input type="text" className="form-control" name="titulo" value={lectura.titulo} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Autor</label>
          <input type="text" className="form-control" name="autor" value={lectura.autor} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Fecha inicio</label>
          <input type="date" className="form-control" name="fecha_inicio" value={lectura.fecha_inicio || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Fecha fin</label>
          <input type="date" className="form-control" name="fecha_fin" value={lectura.fecha_fin || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Lugar fin</label>
          <input type="text" className="form-control" name="lugar_fin" value={lectura.lugar_fin || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Puntaje</label>
          <input type="number" className="form-control" name="puntaje" value={lectura.puntaje || ''} onChange={handleChange} min="1" max="10" />
        </div>
        <div className="mb-2">
          <label>Comentario</label>
          <textarea className="form-control" name="comentario" value={lectura.comentario || ''} onChange={handleChange} />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">💾 Guardar cambios</button>
        </div>
      </form>
    </div>
  );
};

export default EditarLecturaPage;
