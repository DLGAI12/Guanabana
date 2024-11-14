import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ConsultaReparto.css';
import PanelMensajes from './PanelMensajes';
import axios from 'axios';

interface Reparto {
  codigo_pedido: string;
  descripcion: string;
  direccion_entrega: string;
  estado_pedido: string;
  id_pedido: number;
  id_receptor: number;
  id_repartidor: number;
  id_empresa: number;
  nombre_repartidor?: string;
  nombre_receptor?: string;
  nombre_empresa?: string;
}

interface User {
  id: number;
  nombre: string;
  email: string;
  id_tipo_usuario: number;
}



const obtenerNombreUsuario = async (id: number): Promise<string> => {
  try {
    const response = await axios.get(`https://enviosg-1.onrender.com/nombreUsuario/${id}`);
    return response.data.nombre;
  } catch (error) {
    console.error(`Error al obtener el nombre para el ID ${id}`, error);
    return 'Desconocido';
  }
};



const ConsultaReparto: React.FC = () => {
  const location = useLocation();
  const { reparto, esParaUsuario, user } = location.state || {};

  const [repartoConNombres, setRepartoConNombres] = useState<Reparto>(reparto);

  useEffect(() => {
    const obtenerNombresUsuarios = async () => {
      try {
        const nombreRepartidor = await obtenerNombreUsuario(reparto.id_repartidor);
        const nombreReceptor = await obtenerNombreUsuario(reparto.id_receptor);
        const nombreEmpresa = await obtenerNombreUsuario(reparto.id_empresa);

        setRepartoConNombres((prevReparto) => ({
          ...prevReparto,
          nombre_repartidor: nombreRepartidor,
          nombre_receptor: nombreReceptor,
          nombre_empresa: nombreEmpresa,
        }));
      } catch (error) {
        console.error('Error al obtener los nombres de usuario', error);
      }
    };

    obtenerNombresUsuarios();
  }, [reparto.id_repartidor, reparto.id_receptor, reparto.id_empresa]);
  if (!reparto) {
    return <div>No se encontró el reparto.</div>;
  }

  return (
    <div className="consulta-reparto-container">
      <div className="detalle-reparto">
        <h2>Consulta del Reparto</h2>
        <p><strong>ID Pedido:</strong> {repartoConNombres.id_pedido}</p>
        <p><strong>Repartidor:</strong> {repartoConNombres.nombre_repartidor || reparto.id_repartidor}</p>
        <p><strong>Receptor:</strong> {repartoConNombres.nombre_receptor || reparto.id_receptor}</p>
        <p><strong>Estado del Pedido:</strong> {repartoConNombres.estado_pedido}</p>
        {esParaUsuario && (
          <p><strong>Código del Pedido:</strong> {repartoConNombres.codigo_pedido}</p>
        )}
        <button onClick={() => window.history.back()}>Cerrar</button>
      </div>
      <div className="mapa">
        <h3>Mapa aún no disponible</h3>
      </div>
      {esParaUsuario ? (
        <PanelMensajes repartoId={reparto.id_pedido} user={user} idReceptor={reparto.id_receptor} idRepartidor={reparto.id_repartidor} idEmpresa={reparto.id_empresa} />
      ) : (
        <div className="mensaje-restriccion">
          <p>Solo el destinatario, repartidor o vendedor pueden ver y mandar mensajes por aquí.</p>
        </div>
      )}
    </div>
  );
};

export default ConsultaReparto;
