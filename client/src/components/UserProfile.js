import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api';
import '../styles/profile.css'
import Footer from './footer';

const UserProfile = () => {
  const token = localStorage.getItem('jwtToken');
  const [profile, setProfile] = useState(null);

  const current_user = async (projectData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}projects`, projectData,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  };


  if (!profile) return <p>Loading...</p>;

  return (
    <>
    <div id="user-profile">
        <div id="user-banner">
            <button id="edit-profile">
                <i className="bi bi-pencil-square"></i>
                <h2 id="user-edit">Edit profile</h2>
            </button>
        </div>
        <div id="profile-picture">

        </div>
        <h1 id='user-name'>{profile.user}</h1>
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
                            <td className="table-data"> 120</td>
                        </tr>
                        <tr  className='table-row'>
                            <td className="table-data"><i className="bi bi-chat-square-text"></i></td>
                            <td className="table-data">Reviews</td>
                            <td className="table-data">5000</td>
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
