import React ,{useState}from "react";
import LoginForm from './LoginForm';
import '../styles/header.css'
import { useNavigate } from "react-router-dom";


function Nav({onLoginSuccess}){
    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => {
        setModalIsOpen(false);
    };
        const openModal = () => {
            setModalIsOpen(true);
        };

    return(

        <>
            <nav id='navbar'>
              <button className="nav-item" id='nav-login' onClick={openModal}>
                <h2>login</h2>
              </button>
              <button className="nav-item" id='nav-register' onClick={()=>{navigate("/register")}}>
                <h2>register</h2>
              </button>
            </nav>
            <LoginForm
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onLoginSuccess={onLoginSuccess}
            />
        </>
    )
}

export default Nav
