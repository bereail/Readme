import React, { useState } from 'react';
import { buscarLibros, guardarLibro } from '../../api/libros';
import LibroCard from './LibroCard';

function BuscarLibro() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    try {
      const res = await buscarLibros(query);
      setResultados(res.data);
    } catch (err) {
      console.error('Error al buscar libros', err);
    }
  };

  const handleGuardar = async (libro) => {
    const payload = {
      isbn: libro.isbn || '',
      titulo: libro.titulo || '',
      autor: libro.autor || '',
      anio: libro.anio || null,
      portada: libro.portada || '',
      id_usuario: 1,
    };

    try {
      await guardarLibro(payload);
      alert('📘 Libro guardado correctamente');
    } catch (err) {
      console.error('❌ Error al guardar el libro', err);
    }
  };

  const handleSeleccionar = (libro) => {
    localStorage.setItem('libro_seleccionado', JSON.stringify(libro));
    window.location.href = '/seleccionar-lectura';
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Título del libro"
        />
        <button className="btn btn-primary" onClick={handleBuscar}>
          Buscar
        </button>
      </div>

      {resultados.map((libro, index) => (
        <LibroCard
          key={index}
          libro={libro}
          onGuardar={handleGuardar}
          onSeleccionar={handleSeleccionar}
        />
      ))}
    </div>
  );
}

export default BuscarLibro;
