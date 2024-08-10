import React , { useState } from 'react'
import '../styles/header.css'
import LoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";

function Header({onLoginSuccess}) {
  let navigate = useNavigate(); 

  const [modalIsOpen, setModalIsOpen] = useState(false);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <>
        <header id='header'>
            <div id='nav-logo'className='nav-item'><span></span></div>
            <nav id='navbar'>
              <div id='nav-search'>
                <input type='search' placeholder='search' />
                <i class="bi bi-search"></i>
              </div>
              <button className="nav-item" id='nav-login' onClick={openModal}>
                <h2>login</h2>
              </button>
              <button className="nav-item" id='nav-register' onClick={()=>{navigate("/register")}}>
                <h2>register</h2>
              </button>
            </nav>

        </header>
        <LoginForm
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onLoginSuccess={onLoginSuccess}          
        />
    </>
  )
}


export default Header