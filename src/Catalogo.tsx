import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Catalogo.css';

interface Reparto {
  id_pedido: number;
  codigo_pedido: string;
  id_receptor: number;
  id_repartidor: number;
  estado_pedido: string;
  direccion: string;
  descripcion: string;
  id_empresa: number;
  direccion_entrega: string;
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

const Catalogo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user: User = location.state;

  const [repartos, setRepartos] = useState<Reparto[]>([]);
  const [nombresUsuarios, setNombresUsuarios] = useState<{ [key: number]: string }>({});
  const [nuevoRepartoId, setNuevoRepartoId] = useState<string>('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepartos = async () => {
      try {
        let response;
        if (user.id_tipo_usuario === 1) {
          response = await axios.get(`https://enviosg-1.onrender.com/pedidosXusuario/${user.id}`);
        } else if (user.id_tipo_usuario === 2) {
          response = await axios.get(`https://enviosg-1.onrender.com/pedidosXrepartidor/${user.id}`);
        } else if (user.id_tipo_usuario === 3) {
          response = await axios.get(`https://enviosg-1.onrender.com/pedidosXempresa/${user.id}`);
        }
  
        if (response && Array.isArray(response.data)) {
          const repartosConNombres = await Promise.all(response.data.map(async (reparto: Reparto) => {
            const nombreRepartidorResponse = await axios.get(`https://enviosg-1.onrender.com/nombreUsuario/${reparto.id_repartidor}`);
            const nombreReceptorResponse = await axios.get(`https://enviosg-1.onrender.com/nombreUsuario/${reparto.id_receptor}`);
            const nombreEmpresaResponse = await axios.get(`https://enviosg-1.onrender.com/nombreUsuario/${reparto.id_empresa}`);
  
            return {
              ...reparto,
              nombre_repartidor: nombreRepartidorResponse.data.nombre,
              nombre_receptor: nombreReceptorResponse.data.nombre,
              nombre_empresa: nombreEmpresaResponse.data.nombre,
            };
          }));
  
          setRepartos(repartosConNombres);
        } else {
          console.error('La respuesta no es una lista de repartos');
        }
      } catch (error) {
        console.error('Error al obtener los repartos', error);
      }
    };
  
    fetchRepartos();
  }, [user.id, user.id_tipo_usuario]);
  
  const handleRepartoClick = (reparto: Reparto) => {
    const esParaUsuario = reparto.id_receptor === user.id || reparto.id_repartidor === user.id || reparto.id_empresa === user.id;
    navigate('/consulta-reparto', { state: { reparto, esParaUsuario, user } });
  };

  const handleAddReparto = async (e: React.FormEvent) => {
    e.preventDefault();
    const idRepartoNum = Number(nuevoRepartoId);
    if (repartos.some(reparto => reparto.id_pedido === idRepartoNum)) {
      setError(`El pedido con ID ${idRepartoNum} ya existe.`);
      return;
    }

    try {
      const response = await axios.get(`https://enviosg-1.onrender.com/pedidos/${idRepartoNum}`);
      if (response.status === 200) {
        setRepartos([...repartos, response.data]);
        setNuevoRepartoId('');
        setMostrarFormulario(false);
        setError(null);
      } else {
        console.error('Error al obtener el reparto');
      }
    } catch (error) {
      console.error('Error al obtener el reparto', error);
    }
  };

  return (
    <div className="catalogo-container">
      <h2>Lista de Repartos</h2>
      <div className="contenido">
        <div className="repartos-list">
          {repartos.map((reparto) => (
            <div key={reparto.id_pedido} className="reparto-item" onClick={() => handleRepartoClick(reparto)}>
              <p><strong>ID Pedido:</strong> {reparto.id_pedido}</p>
              <p><strong>Repartidor:</strong> {reparto.nombre_repartidor}</p>
              <p><strong>Receptor:</strong> {reparto.nombre_receptor}</p>
              <p><strong>Estado del Pedido:</strong> {reparto.estado_pedido}</p>
              <p><strong>Dirección Entrega:</strong> {reparto.direccion_entrega}</p>
              <p><strong>Empresa:</strong> {reparto.nombre_empresa}</p>
              {reparto.id_receptor === user.id && (
                <p><strong>Código del Pedido:</strong> {reparto.codigo_pedido}</p>
              )}
            </div>
          ))}
        </div>
        {mostrarFormulario && (
          <form onSubmit={handleAddReparto} className="nuevo-reparto-form">
            <h3>Añadir Nuevo Reparto</h3>
            <input
              type="number"
              name="id_pedido"
              placeholder="ID Pedido"
              value={nuevoRepartoId}
              onChange={(e) => setNuevoRepartoId(e.target.value)}
              required
            />
            <button type="submit">Añadir</button>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} className="toggle-button">
        {mostrarFormulario ? 'Cancelar' : 'Añadir'}
      </button>
    </div>
  );
}
export default Catalogo ;