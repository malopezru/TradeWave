import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import Modal from 'react-modal';
import Header from '../page/header';
import { useNavigate  } from 'react-router-dom';


  const DeleteUser = () => {
    const [modalMessage, setModalMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleDeleteUser = async (    ) => {

      if (window.confirm("¿Estás seguro de que deseas borrar el usuario?")) {
        try {
          const user = await axios.post(
            "http://localhost:80/users/getMe",
            {},
            {
              headers: {
                'Authorization': localStorage.getItem('token')
              },
            }
          );
          const response = await axios.delete(`http://localhost:80/users/${user.data.id}`);
          if(response.status === 200){
            localStorage.removeItem('token');
            setModalMessage('Usuario eliminado');
            setModalIsOpen(true);
            //esperar 5 segundos
            setTimeout(() => {
                setModalIsOpen(false);
                navigate('/login');
              
            }, 5000);
          }
        } catch (error) {
          setModalMessage('Error del servidor: '+error);
          setModalIsOpen(true);
        }
      }
    }




  return (
    <div>
    {/* Header */}
    <Header title="Borrar usuario"/>

    {/* Registration Section */}
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>BORRAR CUENTA</span></div>

          <button className="buy-button" onClick={handleDeleteUser}>Eliminar cuenta</button>
          <div className="signup-link">¿No deseas eliminarte? <a href="perfil">Regresa</a></div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="custom-modal">
        <div>{modalMessage}</div>
        <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
      </Modal>
    </div>
    </div>
  );
}

export default DeleteUser;