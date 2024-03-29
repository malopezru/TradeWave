//header component
import React from 'react';

import '../../components/styles.css';
import { Link } from 'react-router-dom';

function Header(props) {
    const token = localStorage.getItem('token');
    let navLinks = [];
    let bool=(token==null);
    if(bool){
        navLinks = [
            { to: '/', text: 'Inicio' },
            { to: '/AppMain', text: 'Lista de acciones' },
            { to: '/Actions', text: 'Acciones compradas' },
            { to: '/perfil', text: 'Perfil' }
        ];
    }
    else{
        navLinks = [
            { to: '/', text: 'Inicio' },
            { to: '/Actions', text: 'Lista de acciones' }
        ];
    }
    return (
        <header>
          <Header title="Acciones compradas" />
          <h1>{props.title}</h1>
          <nav>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="nav-link">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      );
}

export default Header;