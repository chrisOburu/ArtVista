// import React, { useState } from 'react';


// const LoginForm = ({ onLoginSuccess }) => {
//   const [formData, setFormData] = useState({ username: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginUser(formData);
//       console.log(response.data)
//       onLoginSuccess(response.data.access_token);
//     } catch (error) {
//       alert('Login failed.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username" type="text" placeholder="Username" onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import Modal from 'react-modal';
import { loginUser } from '../api';
import './Forms.css'
import { useNavigate } from "react-router-dom";

// Optional: Set the app element for accessibility
Modal.setAppElement('#root');
const LoginForm = ({ isOpen, onRequestClose,onLoginSuccess}) => {
  let navigate = useNavigate(); 
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      //console.log(response.data)
      onLoginSuccess(response.data.access_token);
      onRequestClose();
    } catch (error) {
      console.error('Login failed', error);
      //alert('Login failed.');

    }
  };

  const handleRegisterRedirect = () => {
    onRequestClose();
    
    let path = '/register';

    navigate(path);
    console.log('Redirect to registration');
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Login Form"
        className="login-modal"
        overlayClassName="login-modal-overlay"
      >
        <button className="close-button" onClick={onRequestClose}>&times;</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input name="username" type="text" placeholder="username" onChange={handleChange}  required/>
          </div>
          <div>
            <label>Password:</label>
            <input name="password" type="password" placeholder="password" onChange={handleChange} required/>
            {/* <input
              type="password"
              value={password}
              onChange={handleChange}
              required
            /> */}
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <span onClick={handleRegisterRedirect} className="register-link-text">Register</span></p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;

