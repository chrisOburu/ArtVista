import React from "react";
import '../styles/usernav.css'
import { getUserProfile } from "../api";
import {useNavigate} from 'react-router-dom'
function User(){
    let navigate = useNavigate()
    console.log(getUserProfile())
    return (
        <>
            <nav id='user' onClick ={()=>{ navigate('/projects')}}>
                <h1 id='user-add'>
                <i class="bi bi-folder-plus"></i>
                <p> add project</p>
                </h1>
                <h2>
                    azul21
                </h2>
                <img src="https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" id="user-image" alt="" />
            </nav>
        </>
    )
}


export default User
