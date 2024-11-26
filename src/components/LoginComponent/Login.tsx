import React, { FC, useContext, useEffect, useState } from 'react';
import { SorveteriaContext } from '../../contexts/provider';


interface loginProps {}

const LoginComponent: FC<loginProps> = (props: loginProps) => {
  const { setTeste, teste} = useContext(SorveteriaContext)
  const [numero, setNumero] = useState(0)
  useEffect(() => {
    setTeste('eitahd')
  }, [])
  return (
    <div>
      login Component + {teste}

      {numero}
      <br>
      </br>
      <button onClick={() => setNumero(numero+1)}>asas</button>
      <button onClick={() => setTeste('buse')}>asas</button>
    </div>
  );
}

export default LoginComponent;
