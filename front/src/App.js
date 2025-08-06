import './style/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeleccionarLecturaPage from './pages/GuardarLecturaPage';
import Home from './pages/HomePage';
import Layout from './layouts/Layout';
import MisLecturas from './components/books/MisLecturas';
import BuscarLibro from './components/books/BuscarLibro';
import Explorar from './pages/ExplorarPage';
import VerLecturaPage from './pages/VerLecturaPage';
import EditarLecturaPage from './pages/EditarLecturaPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Envolvemos todas las páginas en el Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buscar-libro" element={<BuscarLibro />} />
          <Route path="/seleccionar-lectura" element={<SeleccionarLecturaPage />} />
          <Route path="/mis-lecturas" element={<MisLecturas />} />
          <Route path="/ver-lectura/:id" element={<VerLecturaPage />} />
           <Route path="/explorar" element={<Explorar/>} />
           <Route path="/editar-lectura/:id" element={<EditarLecturaPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;