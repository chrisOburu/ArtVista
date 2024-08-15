import React , { useState,useEffect } from 'react'
import '../styles/header.css'
import LoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import Nav from './nav';
import User from './usernav';


function Header({onLoginSuccess}) {
  const navigate = useNavigate()
  const [isLogged,setLogged] = useState(false)
  const token = localStorage.getItem('jwtToken');


  
  useEffect(() => {
    if(token){
        fetch('https://artvista-dl5j.onrender.com/curent_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        
        })
        .then(res => res.json())
        .then(res => {
            setLogged(res)
        })

        
    }
    else{
        setLogged(null)
    }
  }, [token])

  console.log(token)
  return (
    <>
        <header id='header' >
            <div id='nav-logo'className='nav-item' onClick={()=>{navigate("/")}}><span></span></div>
            {
             !isLogged?<Nav />:<User />
            }

        </header>

    </>
  )
}


export default Header