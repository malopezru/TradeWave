import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppMain from './components/index';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import StockPurchases from './components/StockPurchases';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AppMain" element={<AppMain />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Actions" element={<StockPurchases />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;