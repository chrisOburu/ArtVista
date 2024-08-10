import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Modal from 'react-modal';
import Header from './header';
import Footer from './footer';

const LandingPage = ({onLoginSuccess}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  

  return (
    <>
      <Header />
      <Footer />
    </>


  );
};

export default LandingPage;
