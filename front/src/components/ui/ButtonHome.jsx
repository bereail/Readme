// ✅ Extraer botón reutilizable a un componente
// src/components/ui/ButtonHome.jsx
import React from 'react';

const ButtonHome = ({ text, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white text-black text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-transform shadow-lg"
  >
    {icon} {text}
  </button>
);

export default ButtonHome;
