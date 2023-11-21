//header component
import React from 'react';
//import logo
import logo from '../../TradeWaveLogo.png';

import '../../components/styles.css';
import { Link } from 'react-router-dom';

function Header(props) {
    const token = localStorage.getItem('token');
    let navLinks = [];
    let bool=(token!=null);
    if(bool){
        navLinks = [
            { to: '/AppMain', text: 'Lista de acciones' },
            { to: '/Actions', text: 'Acciones compradas' },
            { to: '/perfil', text: 'Perfil' }
        ];
    }
    else{
        navLinks = [
            { to: '/login', text: 'Inicio' },
            { to: '/Actions', text: 'Lista de acciones' }
        ];
    }
    return (
      <header>
        <div className="logo-container">
          <img
            src={logo}
            alt="TradeWave Logo"
            style={{ maxWidth: "7%", height: "auto" }}
          />
          <div className="app-name-container">
            <h1 className="page-name">TradeWave</h1>
          </div>
        </div>
        <nav >
          <div className="button-container">
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="nav-link">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
      );
}

export default Header;