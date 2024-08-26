import React from "react";
import '../styles/usernav.css'
import {useNavigate} from 'react-router-dom'


function User(){
    const token = localStorage.getItem('jwtToken');
    let navigate = useNavigate()

    console.log(token)
    return (
        <>  
            <nav id='user'>
                <a href="/" className="header-nav"><i class="bi bi-house-check-fill"></i>|Home</a>
                <a href="/submit-project" className="header-nav"><i className="bi bi-folder-plus"></i>|project</a>
                <img onClick={()=>{navigate('/profile')}} src="https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" id="user-image" alt="" />
            </nav>
        </>
    )
}


export default User
