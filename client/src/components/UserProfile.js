import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'
import Footer from './footer';

const UserProfile = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('jwtToken');
    const [profile, setProfile] = useState(null);
    //const [userdata, setData] = useState(null)

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
                .then(data => {
                    setProfile(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    setProfile(null);  // Reset profile in case of error
                });
        } else {
            setProfile(null);
        }
    }, [token]);

    

    if (!profile) return <p>Loading...</p>;





    const logout = () => {
        localStorage.removeItem('jwtToken')
        //console.log(token)
        navigate("/")
    }
    return (
        <>
            <div id="user-profile">
                <div id="user-banner">
                    <nav id='user-nav'>
                        <button className="edit-profile">
                            <a href="/" className="header-nav"><i class="bi bi-house-check-fill"></i>|Home</a>
                        </button>
                        <button className="edit-profile">
                            <a href="/submit-project" className="header-nav"><i className="bi bi-folder-plus"></i>|project</a>
                        </button>
                        <button className="edit-profile" onClick={logout}>
                            {/* eslint-disable-next-line */}
                            <a href="" className="header-nav">
                                <i className="bi bi-pencil-square"></i>
                                <p >logout</p></a>
                        </button>

                    </nav>

                </div>
                <div id="profile-picture">

                </div>
                <h1 id='user-name'>{profile.name}</h1>
                <h2 id='user-role'>{profile.email}</h2>
                <div id="user-summary">
                    <div id="projects">
                        <h1>Projects</h1>
                    </div>
                    <div id="account-summary">
                        <h2>Account summary</h2>
                        <table id='table'>
                            <tr className="table-row">
                                <td className="table-data"><i className="bi bi-cast"></i></td>
                                <td className="table-data"> Projects</td>
                                <td className="table-data"> 0</td>
                            </tr>
                            <tr className='table-row'>
                                <td className="table-data"><i className="bi bi-chat-square-text"></i></td>
                                <td className="table-data">Reviews</td>
                                <td className="table-data">0</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    );
};

export default UserProfile;
