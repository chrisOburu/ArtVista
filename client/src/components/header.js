import React , { useState } from 'react'
import '../styles/header.css'
import LoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import Nav from './nav';
import User from './usernav';


function Header({onLoginSuccess}) {
  const [islogged, setlogged] = useState(false)
  let navigate = useNavigate();
  let loginStatus = ()=>{
    setlogged(onLoginSuccess)
  }


  return (
    <>
        <header id='header'  onLoad={loginStatus}>
            <div id='nav-logo'className='nav-item' onClick={()=>{navigate("/")}}><span></span></div>
            {
              islogged?<User />:<Nav />

            }

        </header>

    </>
  )
}


export default Header