import React from 'react';

const imagenFallback = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";

function LibroCard({ libro, onGuardar, onSeleccionar }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2 d-flex align-items-center justify-content-center p-2">
          <img
            src={libro.portada || imagenFallback}
            alt="Portada"
            onError={(e) => { e.target.src = imagenFallback; }}
            style={{ width: '100px', height: '150px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{libro.titulo}</h5>
            <p className="card-text">{libro.autor} ({libro.anio})</p>
            {onGuardar && (
              <button className="btn btn-success me-2" onClick={() => onGuardar(libro)}>
                Guardar
              </button>
            )}
            {onSeleccionar && (
              <button className="btn btn-primary" onClick={() => onSeleccionar(libro)}>
                Seleccionar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibroCard;
