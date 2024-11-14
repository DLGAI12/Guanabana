import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import Catalogo from './Catalogo';
import ConsultaReparto from './ConsultaReparto';
import Registro from './Registro';
import RegistrarPedido from './RegistrarPedido';
import EmpresaDashboard from './CatalogoEmpresa';

const App: React.FC = () => {
  const location = useLocation();

  // Si el idUsuario se pasa como estado, lo recuperamos desde location
  const { idUsuario } = location.state || {}; // Asegúrate de que 'idUsuario' esté en el state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consulta-reparto" element={<ConsultaReparto />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/registro" element={<Registro />} />
        <Route 
          path="/registrar-pedido" 
          element={idUsuario ? <RegistrarPedido idUsuario={idUsuario} /> : <div>No se encontró el idUsuario.</div>} 
        />
        <Route path="/empresa-dashboard" element={<EmpresaDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;