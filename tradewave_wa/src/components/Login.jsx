import React from 'react';
import './styles.css'; // Importa tu archivo CSS personalizado aquí
import Header from '../page/header/index.jsx';
import LoginForm from '../page/Forms/LoginForm.jsx';
import Footer from '../page/Footer';
function Login() {


  return (
    <div>
      <Header title="Iniciar sesión" />
      <LoginForm handleLogin />
      <Footer />
    </div>
  );
}

export default Login;