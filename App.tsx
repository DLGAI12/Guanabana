import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Inicio';
import Login from './Login';
import Catalogo from './Catalogo';
import ConsultaReparto from './ConsultaReparto';
import Registro from './Registro';
import RegistrarPedido from './RegistrarPedido';
import EmpresaDashboard from './CatalogoEmpresa';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consulta-reparto" element={<ConsultaReparto />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registrar-pedido" element={<RegistrarPedido />} />
        <Route path="/empresa-dashboard" element={<EmpresaDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
