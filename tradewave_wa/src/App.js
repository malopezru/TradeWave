import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppMain from './components/index';
import Login from './components/Login';
import Register from './components/Register';
import Perfil from './components/Perfil';
import StockPurchases from './components/StockPurchases';
import StockDetails from './components/stockDetails';
import DeleteUser from './components/DeleteUser';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<AppMain />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/AppMain" element={<AppMain />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Actions" element={<StockPurchases />} />
          <Route path="/Details" element={<StockDetails />} />
          <Route path="/DeleteUser" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;