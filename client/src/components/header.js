import React , { useState,useEffect } from 'react'
import '../styles/header.css'
import { useNavigate } from "react-router-dom";
import Nav from './nav';
import User from './usernav';


function Header({onLoginSuccess}) {
  const navigate = useNavigate()
  const [isLogged,setLogged] = useState(false)
  const token = localStorage.getItem('jwtToken');


  useEffect(() => {
    if (token) {
        fetch('https://artvista-dl5j.onrender.com/current_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(res => {
            setLogged(res);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setLogged(null);
        });
    } else {
        setLogged(null);
    }
    }, [token]);


  //console.log(token)
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