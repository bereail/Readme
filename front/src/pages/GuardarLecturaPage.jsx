// ✅ src/pages/GuardarLibro.jsx
import React from 'react';
import GuardarLectura from '../components/books/GuardarLectura';

const SeleccionarLecturaPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Lectura</h2>
      <GuardarLectura />
    </div>
  );
};

export default SeleccionarLecturaPage;
