import React, { FC, useContext, useEffect, useState } from 'react';
import { SorveteriaContext } from '../../contexts/provider';
import { api } from '../../axios';
import { Navigate, Route, Router, Routes, useNavigate, useNavigation } from 'react-router-dom';


interface loginProps {}

const LoginComponent = (props: loginProps) => {
  const navigate = useNavigate()
  const { setTeste, teste} = useContext(SorveteriaContext)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
useEffect(() => {
  localStorage.clear()
}, [])
  const handleLogin = () => {
    
    
    try {
      
      api.post('api/authentication/login', JSON.stringify({email: email, password: password}))
      .then((res: any) => {
        
        localStorage.setItem("email", email!);
        localStorage.setItem("token", res.data.token!);
        navigate('orders')
      }).catch((e) => {
        
        window.alert('erro de autenticação')
      })
    } catch (error) {
      
    }
  }
  return (
    <div className='flex m-0 h-screen w-screen justify-center align-middle items-center'>
      <div className='flex flex-col h-1/3 w-1/3 justify-between align-middle items-center p-60'>
          <span>Login</span>
          <input type="email" name='email' className='bg-gray-50' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" name='password' className='bg-gray-50' onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={handleLogin}>Logar</button>
      </div>
    </div>
  );
}

export default LoginComponent;