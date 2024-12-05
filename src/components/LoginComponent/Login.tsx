import React, { useContext, useEffect, useState } from 'react';
import { SorveteriaContext } from '../../contexts/provider';
import { api } from '../../axios';
import { useNavigate } from 'react-router-dom';

interface loginProps {}

const LoginComponent = (props: loginProps) => {
  const navigate = useNavigate();
  const { setTeste, teste } = useContext(SorveteriaContext);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = () => {
    try {
      api
        .post('api/authentication/login', JSON.stringify({ email, password }))
        .then((res: any) => {
          localStorage.setItem('email', email!);
          localStorage.setItem('token', res.data.token!);
          navigate('orders');
        })
        .catch(() => {
          window.alert('Erro de autenticação');
        });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <div
      className="flex m-0 h-screen w-screen justify-center items-center"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-summer-ice-cream-ice-cream-propaganda-image_11340.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col h-1/3 w-1/3 justify-between items-center p-10 bg-white bg-opacity-40 backdrop-blur-md shadow-lg rounded-lg">
        <span className="text-2xl font-bold mb-5 text-pink-600">Login</span>
        <input
          type="email"
          name="email"
          className="w-full p-3 border border-pink-300 bg-pink-100 text-pink-800 rounded-xl mb-4 placeholder-pink-600 focus:ring-2 focus:ring-pink-300 outline-none transition duration-200"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="w-full p-3 border border-blue-300 bg-blue-100 text-blue-800 rounded-xl mb-4 placeholder-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-full hover:from-pink-300 hover:to-blue-300 transition duration-300 shadow-md"
        >
          Logar
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
