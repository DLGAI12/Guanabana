import axios from 'axios';

const api = axios.create({
    baseURL: 'https://enviosg-1.onrender.com/',  //url principal
    timeout: 2000,                     
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
    }
);

export default api;
