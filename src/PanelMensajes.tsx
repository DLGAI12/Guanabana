import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PanelMensajes.css';

interface Mensaje {
  id_mensaje: number;
  contenido: string;
  fecha_envio: string;
  id_destinatario: number;
  id_pedido: number;
  id_remitente: number;
}

interface User {
  id: number;
  nombre: string;
  email: string;
  id_tipo_usuario: number;
}

interface PanelMensajesProps {
  repartoId: number;
  user: User;
  idReceptor: number;
  idRepartidor: number;
  idEmpresa: number;
}

const PanelMensajes: React.FC<PanelMensajesProps> = ({ repartoId, user, idReceptor, idRepartidor, idEmpresa}) => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState<string>('');

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await axios.get(`https://enviosg-1.onrender.com/mensajesXpedido/${repartoId}`);
        if (response.status === 200 && Array.isArray(response.data)) {
          setMensajes(response.data);
        } else {
          console.error('Error al obtener los mensajes');
        }
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
      }
    };

    fetchMensajes();
  }, [repartoId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoMensaje(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const id_destinatario = (user.id === idReceptor) ? idRepartidor : idReceptor;

      const valores = {
        id_pedido: repartoId,
        id_remitente: user.id,
        id_destinatario: id_destinatario,
        contenido: nuevoMensaje,
      }
      const response = await axios.post('https://enviosg-1.onrender.com/mensajes', valores);
      if (response.status === 201) {
        setMensajes([...mensajes, response.data]);
        setNuevoMensaje('');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <div className="panel-mensajes-container">
      <h3>Mensajes</h3>
      <ul>
        {mensajes.map((mensaje) => (
          <li key={mensaje.id_mensaje} className={mensaje.id_remitente === user.id ? 'mensaje-destinatario' : 'mensaje-repartidor'}>
            {mensaje.contenido} <br />
            <small>{new Date(mensaje.fecha_envio).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <div className="enviar-mensaje">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje"
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default PanelMensajes;

