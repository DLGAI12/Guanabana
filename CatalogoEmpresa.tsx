import React from 'react';
import { useLocation } from 'react-router-dom';
import RegistrarPedido from './RegistrarPedido';
import Catalogo from './Catalogo';
import './CatalogoEmpresa.css';

const EmpresaDashboard: React.FC = () => {
  const location = useLocation();
  const { id, nombre, correo, id_tipo_usuario } = location.state;

  return (
    <div className="empresa-dashboard-container">
      <h1>Menú de Administrador de Empresa</h1>
      <RegistrarPedido idUsuario={id} />
      <Catalogo />
    </div>
  );
};

export default EmpresaDashboard;
