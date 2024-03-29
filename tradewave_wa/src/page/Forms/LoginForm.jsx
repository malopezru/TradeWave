import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../components/styles.css'; // Importa tu archivo CSS personalizado aquí
import axios from 'axios';
import CustomModal from '../../components/Modal'; // Importa el componente CustomModal
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${"http://localhost:80/users/login"}`,
        {
          email: email,
          password: password
        }
      );
      console.log(response);
      if (response.request.status === 200) {
        // guardar el token en el local storage
        localStorage.setItem('token', response.data.token);
        //get token from local storage
        // redireccionar a la ruta /appMain
        navigate('/AppMain');
      }
    } catch (error) {

      console.error(error);
      if (error.status === 401) {
        setModalMessage('Credenciales incorrectas');
      }
      else if (error.status === 404) {
        setModalMessage('Usuario no encontrado');
      }
      else{
        setModalMessage('Error del servidor');
      }

      //setModalIsOpen(true);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="title"><span>Logueate</span></div>
          <form onSubmit={handleLogin}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="signup-link">¿Olvidaste tu contraseña? <a href="/ForgotPassword">Haz clic aquí</a></div>
            <div className="row button">
              <input type="submit" value="Logueate" />
            </div>
            <div className="signup-link">No eres miembro? <Link to="/register">Regístrate ahora</Link></div>
          </form>
        </div>
      </div>

      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}

export default Login;