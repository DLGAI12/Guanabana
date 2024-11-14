import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';
import axios from 'axios';

const Inicio: React.FC = () => {
  const [idPedido, setIdPedido] = useState('');
  const [, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdPedido(event.target.value);
  };

  const handleConsultarPedido = async () => {
    await fetchPedidos();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const fetchPedidos = async () => {
    try {
      const response = await axios.get(`https://enviosg-1.onrender.com/pedidos/${idPedido}`);
      setPedidos(response.data);
      setError('');
      navigate('/consulta-reparto', { state: { reparto: response.data } });
    } catch (error) {
      setError('Pedido no encontrado');
      console.error('Error fetching pedidos:', error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <div className="box">
        <h1>Menú de Inicio</h1>
        <div className="inputContainer">
          <label htmlFor="idPedido">Consultar sin iniciar sesión: </label>
          <input
            type="text"
            id="idPedido"
            value={idPedido}
            onChange={handleInputChange}
            placeholder="ID de Pedido"
            className="input"
          />
          <button onClick={handleConsultarPedido} className="button">Consultar Pedido</button>
        </div>
        <button onClick={handleLogin} className="button">Iniciar Sesión</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Inicio;
