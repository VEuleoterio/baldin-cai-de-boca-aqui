import axios from "axios";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {'Content-Type': 'application/json'}
});

const notUseAuthRouters = ['api/authentication/login']
api.interceptors.request.use(
    (config) => {
      
      if(config.url && !notUseAuthRouters.includes(config.url)){
        
        const token = localStorage.getItem('token')
        if(token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
      }
        return config
    }, (error) => { // Handle request error 
        return Promise.reject(error); }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
        const navigate = useNavigate()
        navigate('login')
        localStorage.clear()
        window.alert('erro de autenticação')
    }
    return Promise.reject(error);
  }
);
