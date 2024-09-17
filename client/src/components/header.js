import React , { useState } from 'react'
import '../styles/header.css'
import LoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import Nav from './nav';
import User from './usernav';


function Header({onLoginSuccess}) {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken');
  console.log(Boolean(token))


  return (
    <>
        <header id='header' >
            <div id='nav-logo'className='nav-item' onClick={()=>{navigate("/")}}><span></span></div>
            {
              Boolean(token)?<User />:<Nav />
            }

        </header>

    </>
  )
}


export default Header