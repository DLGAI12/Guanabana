import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios, { AxiosError, AxiosResponse } from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const usuarioPeticion = {
      correo: username,
      contraseña: password,
    };

    try {
      const response: AxiosResponse<{ success: boolean; usuario: { id: number; nombre: string; correo: string; id_tipo_usuario: number } }> = 
          await axios.post('https://enviosg-1.onrender.com/login', usuarioPeticion);
      
      if (response.data.success) {
        const { id, nombre, correo, id_tipo_usuario } = response.data.usuario;

        if (id_tipo_usuario === 3) {
          navigate('/empresa-dashboard', { state: { id, nombre, correo, id_tipo_usuario } });
        } else {
          navigate('/catalogo', { state: { id, nombre, correo, id_tipo_usuario} });
        }
      } else {
        setError('Inicio de sesión fallido');
      }
    } catch (error) {
      setError('Inicio de sesión fallido');
    }
  };

  return (
    <div className="login-container">
      <div className="box">
        <h1>Inicio de Sesión</h1>
        <div className="inputContainer">
          <label htmlFor="username">Correo: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Ingresa tu correo"
            className="input"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Contraseña: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña"
            className="input"
          />
        </div>
        <div className="buttonContainer">
          <button onClick={handleLogin} className="button">Iniciar Sesión</button>
          <button onClick={() => navigate('/registro')} className="button">Registrarse</button>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
