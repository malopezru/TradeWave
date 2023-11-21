import React from 'react';
import Modal from 'react-modal';
//import styles
import './styles.css'; // Importa tu archivo CSS personalizado aquí


Modal.setAppElement('#root');

function CustomModal(props) {
  const { isOpen, onRequestClose, message } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="custom-modal" // Add the className here
    >
      <div>{message}</div>
      <button onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
}

export default CustomModal;