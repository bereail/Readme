// ✅ src/components/books/GuardarLectura.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guardarLectura } from '../../api/libros';
import BuscarLibro from './BuscarLibro'; // ⬅️ Asegurate que esta importación sea correcta

function GuardarLectura() {
  const [libro, setLibro] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [lugarFin, setLugarFin] = useState('');
  const [puntaje, setPuntaje] = useState('');
  const [comentario, setComentario] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const libroGuardado = localStorage.getItem("libro_seleccionado");
    if (libroGuardado) {
      const parsedLibro = JSON.parse(libroGuardado);
      parsedLibro.imagen_url = parsedLibro.imagen_url || parsedLibro.portada || '';
      setLibro(parsedLibro);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      usuario_id: 1,
      isbn: libro?.isbn || '',
      titulo: libro?.titulo || '',
      autor: libro?.autor || '',
      imagen_url: libro?.imagen_url || '',
      fecha_inicio: fechaInicio || null,
      fecha_fin: fechaFin || null,
      lugar_fin: lugarFin || null,
      puntaje: puntaje ? parseInt(puntaje) : null,
      comentario: comentario || ''
    };

    try {
      await guardarLectura(payload);
      localStorage.removeItem("libro_seleccionado");
      alert("✅ Lectura registrada");
      navigate('/mis-lecturas');
    } catch (err) {
      console.error('❌ Error al guardar la lectura', err);
    }
  };

  return (
    <div className="p-3">
      {!libro ? (
        <>
          <BuscarLibro />
        </>
      ) : (
        <form onSubmit={handleSubmit} className="p-3 border rounded">
          {libro.imagen_url && (
            <div className="text-center mb-3">
              <img
                src={libro.imagen_url}
                alt="Portada"
                style={{ width: '120px', height: '180px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
                }}
              />
            </div>
          )}

          <h4 className="text-center">{libro.titulo}</h4>

          <div className="mb-2">
            <label>📅 Fecha de inicio</label>
            <input type="date" className="form-control" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </div>
          <div className="mb-2">
            <label>📅 Fecha de fin</label>
            <input type="date" className="form-control" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>
          <div className="mb-2">
            <label>📍 Lugar donde lo terminaste</label>
            <input type="text" className="form-control" value={lugarFin} onChange={(e) => setLugarFin(e.target.value)} />
          </div>
          <div className="mb-2">
            <label>⭐ Puntaje (1-10)</label>
            <input type="number" className="form-control" value={puntaje} onChange={(e) => setPuntaje(e.target.value)} min="1" max="10" />
          </div>
          <div className="mb-2">
            <label>💬 Comentario</label>
            <textarea className="form-control" value={comentario} onChange={(e) => setComentario(e.target.value)} rows="3" />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">📘 Guardar lectura</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default GuardarLectura