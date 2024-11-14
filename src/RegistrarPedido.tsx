import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './registrarPedido.css';

const RegistrarPedido: React.FC = () => {
  const location = useLocation();
  const { idUsuario } = location.state;

  const [codigo, setCodigoPedido] = useState('');
  const [nombre_receptor, setNombreReceptor] = useState('');
  const [correo_receptor, setCorreoReceptor] = useState('');
  const [id_repartidor, setIdRepartidor] = useState('');
  const [estado_pedido, setEstadoPedido] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion_entrega, setDireccionEntrega] = useState('');
  const [repartidores, setRepartidores] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepartidores = async () => {
      try {
        const response = await axios.get('https://enviosg-1.onrender.com/nombreRepartidores');
        setRepartidores(response.data);
      } catch (error) {
        console.error('Error fetching repartidores:', error);
      }
    };

    fetchRepartidores();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'codigo_pedido':
        setCodigoPedido(value);
        break;
      case 'nombre_receptor':
        setNombreReceptor(value);
        break;
      case 'correo_receptor':
        setCorreoReceptor(value);
        break;
      case 'id_repartidor':
        setIdRepartidor(value);
        break;
      case 'estado_pedido':
        setEstadoPedido(value);
        break;
      case 'descripcion':
        setDescripcion(value);
        break;
      case 'direccion_entrega':
        setDireccionEntrega(value);
        break;
      default:
        break;
    }
  };

  const handleRegistrarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const valores = {
        codigo,
        nombre_receptor,
        correo_receptor,
        id_repartidor: `${id_repartidor}`,
        estado_pedido,
        direccion_entrega,
        descripcion,
        id_empresa: `${idUsuario}`,
      };

      const response = await axios.post('https://enviosg-1.onrender.com/pedidos', valores);
      if (response.status === 200) {
        setCodigoPedido('');
        setNombreReceptor('');
        setCorreoReceptor('');
        setIdRepartidor('');
        setEstadoPedido('');
        setDescripcion('');
        setDireccionEntrega('');
        setError(null);
      } else {
        console.error('Error al registrar el pedido');
      }
    } catch (error) {
      console.error('Error al registrar el pedido', error);
      setError('Error al registrar el pedido');
    }
  };

  return (
    <form onSubmit={handleRegistrarPedido} className="nuevo-registro-form">
      <h3>Registrar Nuevo Pedido</h3>
      <input
        type="text"
        name="codigo_pedido"
        placeholder="Código del Pedido"
        value={codigo}
        onChange={handleInputChange}
        required
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          name="nombre_receptor"
          placeholder="Nombre del Receptor"
          value={nombre_receptor}
          onChange={handleInputChange}
          required
          style={{ flex: 1 }}
        />
        <input
          type="email"
          name="correo_receptor"
          placeholder="Correo del Receptor"
          value={correo_receptor}
          onChange={handleInputChange}
          required
          style={{ flex: 1 }}
        />
      </div>
      <select
        name="id_repartidor"
        value={id_repartidor}
        onChange={handleInputChange}
        required
      >
        <option value="">Selecciona repartidor</option>
        {repartidores.map((repartidor: any) => (
          <option key={repartidor.id_usuario} value={repartidor.id_usuario}>
            {repartidor.nombre}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="estado_pedido"
        placeholder="Estado del Pedido"
        value={estado_pedido}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="direccion_entrega"
        placeholder="Dirección Entrega"
        value={direccion_entrega}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={descripcion}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Registrar</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegistrarPedido;
