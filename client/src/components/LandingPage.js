import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Modal from 'react-modal';


const LandingPage = ({onLoginSuccess}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  

  return (
    <div>
      <header>
        <h1>Welcome to ArtVista</h1>
        <p>Discover inspiring projects and showcase your work.</p>
        <button onClick={openModal}>Login</button>
        <Link to="/register">Sign Up</Link>
        <Link to="/projects">View Projects</Link>
        <LoginForm
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onLoginSuccess={onLoginSuccess}
          //onSuccess={handleLogin}
          
        />
      </header>
      {/* Add Project Grid and other content */}
    </div>
  );
};

export default LandingPage;
