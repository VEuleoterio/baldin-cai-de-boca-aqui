import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent/Login';
import { SorveteriaProvider } from './contexts/provider';
import OrdersComponent from './components/OrdersComponent/OrdersComponent';
import FlavorsComponent from './components/Flavors/FlavorsComponent';

const App = ()=>{
  return (
    <BrowserRouter>
      <SorveteriaProvider>
        <Routes>
          <Route path="/" Component={LoginComponent}></Route>
          <Route path="/orders" Component={OrdersComponent}></Route>
          <Route path="/flavors" Component={FlavorsComponent}></Route>
        </Routes>
      </SorveteriaProvider>
    </BrowserRouter>
  );
}

export default App;
