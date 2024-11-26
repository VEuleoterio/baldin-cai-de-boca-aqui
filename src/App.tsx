import './App.css';
import LoginComponent from './components/LoginComponent/Login';
import { defaultContextValue, SorveteriaContext, SorveteriaProvider } from './contexts/provider';

const App = ()=>{
  return (
    <div className='flex h-full w-full'>
      <LoginComponent></LoginComponent>
    </div>
  );
}

export default App;
