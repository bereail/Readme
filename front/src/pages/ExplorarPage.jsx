import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonHome from '../components/ui/ButtonHome';
import BuscarLibro from '../components/books/BuscarLibro';

const Explorar = () => {
  const navigate = useNavigate();

  const goTo = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-10 px-4">
      <main className="flex flex-col items-center gap-6 mt-20 w-full max-w-md">
        <BuscarLibro />
        <ButtonHome text="Género" onClick={() => goTo('/generos')} />
        <ButtonHome text="Más Leídos" onClick={() => goTo('/mas-leidos')} />
        <ButtonHome text="Mejores Puntuados" onClick={() => goTo('/mejores-puntuados')} />
      </main>
    </div>
  );
};

export default Explorar;
