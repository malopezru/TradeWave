import React from 'react';
import Header from '../page/header/index.jsx';
import Footer from '../page/Footer/index.jsx';
import { Link } from 'react-router-dom';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

  
  function Perfil() {
    const [user, setuser] = useState([]);
    const navigate = useNavigate();
    useState(() => {

        const fetchUser = async (e) => {
            try {
              const response = await axios.post(
                "http://localhost:80/users/getMe",
                {},
                {
                  headers: {
                    'Authorization': localStorage.getItem('token')
                    
                  },
                }
              );
              const data = response.data;
              setuser(data);
            } catch (error) {
              console.error(error);
              // Error handling
            }
          };
          fetchUser();
        }, []);
    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
  
    return (
        <div>
          <Header title="Favoritos"/>
          <body id="hey">
            <h2 className="center-text white-text">User Profile Card</h2>
            <div className="container">
              <div className="rounded-box card">
                <h1 className="user-name">User Name</h1>
                <p className="title">Name:{user.name}</p>
                <p className="title">Email:{user.email}</p>
                <p className="title">Options</p>
                <p>
                  <Link to="/DeleteUser">
                    <button className="buy-button">Borrar usuario </button>
                  </Link>
                </p>
                <p>
                  <button className="buy-button" onClick={handleLogout}>Cerrar sesión</button>
                </p>
              </div>
              <div className="favorite-comics">
              </div>
            </div>
          </body>
          <Footer/>
        </div>
      );
    }
    
  
  export default Perfil;
