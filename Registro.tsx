import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registro.css';
import axios from 'axios';

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [idTipoUsuario, setIdTipoUsuario] = useState<number | null>(null);
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleDireccionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDireccion(event.target.value);
  };

  const handleCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(event.target.value);
  };

  const handleContraseñaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContraseña(event.target.value);
  };

  const handleRegistro = async () => {
    if (idTipoUsuario === null) {
      setError('Selecciona un tipo de usuario');
      return;
    }
    
    const nuevoUsuario = {
      nombre,
      id_tipo_usuario: idTipoUsuario,
      direccion: idTipoUsuario === 3 ? direccion : '', // Incluir dirección solo si es Vendedor
      correo,
      contraseña,
    };

    try {
        let response;
        response = await axios.post('https://enviosg-1.onrender.com/usuarios', nuevoUsuario); // Enviar data en el cuerpo de la solicitud
      if (response.data.success) {
        navigate('/catalogo');
        setError('Registro Exitoso');
      } else {
        setError('Registro fallido');
      }
    } catch (error) {
      setError('Error al enviar datos');
    }
  };

  const handleTipoUsuarioChange = (tipo: number) => {
    setIdTipoUsuario(tipo);
    if (tipo !== 3) {
      setDireccion(''); // Reiniciar dirección si no es Vendedor
    }
  };

  return (
    <div className="registro-container">
      <div className="box">
        <h1>Registro</h1>
        <div className="inputContainer">
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ingresa tu nombre"
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label>Tipo de Usuario: </label>
          <div className="buttonGroup">
            <button
              className={`button ${idTipoUsuario === 1 ? 'active' : ''}`}
              onClick={() => handleTipoUsuarioChange(1)}
            >
              Cliente
            </button>
            <button
              className={`button ${idTipoUsuario === 2 ? 'active' : ''}`}
              onClick={() => handleTipoUsuarioChange(2)}
            >
              Repartidor
            </button>
            <button
              className={`button ${idTipoUsuario === 3 ? 'active' : ''}`}
              onClick={() => handleTipoUsuarioChange(3)}
            >
              Vendedor
            </button>
          </div>
        </div>
        {idTipoUsuario === 3 && (
          <div className="inputContainer">
            <label htmlFor="direccion">Dirección: </label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={handleDireccionChange}
              placeholder="Ingresa tu dirección"
              className="input"
            />
          </div>
        )}
        <div className="inputContainer">
          <label htmlFor="correo">Correo: </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={handleCorreoChange}
            placeholder="Ingresa tu correo"
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="contraseña">Contraseña: </label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={handleContraseñaChange}
            placeholder="Ingresa tu contraseña"
            className="input"
          />
        </div>
        <div className="buttonContainer">
          <button onClick={handleRegistro} className="button">Registrar</button>
          <button onClick={() => navigate('/login')} className="button">Cancelar</button>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Registro;
