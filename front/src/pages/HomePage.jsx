// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonHome from '../components/ui/ButtonHome'; // importar componente

const Home = () => {
  const navigate = useNavigate();
  const goTo = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between py-10 px-4">

      <main className="flex flex-col items-center gap-8 mt-20">
        <p className="text-lg mb-4">Hola, Berenice. ¿Qué querés hacer hoy?</p>
        <ButtonHome icon="✏️" text="Cargar Lectura" onClick={() => goTo('/seleccionar-lectura')} />
        <ButtonHome icon="🌎" text="Explorar" onClick={() => goTo('/explorar')} />
      </main>


    </div>
  );
};

export default Home;
