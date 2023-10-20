import React, { useState } from 'react';
import axios from 'axios';// importa useHistory desde React Router
import './styles.css'
import Header from '../page/header/index.jsx';
import Footer from '../page/Footer';
import { useNavigate } from "react-router-dom";
import CustomModal from './Modal';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [contrasena2, setContrasena2] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(contrasena!==contrasena2){
      setModalMessage('Las contraseñas no coinciden');
      setModalIsOpen(true);
      return;
    }
    try {
      const response = await axios.post(
        `${"/api/user/register"}`,
        {
          nombre,
          correo_electronico: email,
          contrasena,
        }
      );

      if (response.status === 200) {
        setModalMessage('Usuario registrado exitosamente');
        setModalIsOpen(true);
        setTimeout(() => {
            //redireccionar a login
            navigate('/login');
          }
          , 5000);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setModalMessage('El usuario ya existe');
      }
      else if(error.response.status === 400){
        setModalMessage('Error en los datos ingresados');
      }
      else{
        setModalMessage('Error del servidor');
      }
      setModalIsOpen(true);
    }
  };

  return (
    <div>
      <Header title="Registro de usuario" />

      <div className="container">
        <div className="wrapper">
          <div className="title"><span>Regístrate</span></div>
          <form onSubmit={handleFormSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="row">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Contraseña" value={contrasena2} onChange={(e) => setContrasena2(e.target.value)} required />
            </div>
            <div className="row button">
              <input type="submit" value="Regístrate" />
            </div>
            <div className="signup-link">¿Ya eres miembro? <a href="/">Inicia sesión</a></div>
          </form>
        </div>
      </div>
      <CustomModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} message={modalMessage} /> 
      <Footer/>
    </div>
  );
}

export default Register;
