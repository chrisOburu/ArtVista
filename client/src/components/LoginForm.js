import React, { useState } from 'react';
import Modal from 'react-modal';
import { loginUser } from '../api';
import './Forms.css';
import { useNavigate } from "react-router-dom";

// Optional: Set the app element for accessibility
Modal.setAppElement('#root');

const LoginForm = ({ isOpen, onRequestClose, onLoginSuccess }) => {
  let navigate = useNavigate(); 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(''); // State for the message
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // State for message modal
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submit button
  const [messageType, setMessageType] = useState(''); // State for the message type (success or error)
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(''); // Clear previous message
    setMessageType(''); // Clear previous message type
    try {
      const response = await loginUser(formData);
      localStorage.setItem('jwtToken', response.data.access_token);
      setMessage('Login successful!');
      setMessageType('success'); // Set message type to success
      onLoginSuccess(response.data.access_token);
      onRequestClose();
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      setMessageType('error'); // Set message type to error
    } finally {
      setIsSubmitting(false);
      // Show the message modal
      setIsMessageModalOpen(true);
      // Automatically close the message modal after 3 seconds
      setTimeout(() => {
        setIsMessageModalOpen(false);
        navigate('/');
      }, 3000);
    }
  };

  const handleRegisterRedirect = () => {
    onRequestClose();
    let path = '/register';
    navigate(path);
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
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" type="text" placeholder="username" onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="password" onChange={handleChange} required />
          </div>
          <button type="submit" disabled={isSubmitting}>Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <span onClick={handleRegisterRedirect} className="register-link-text">Register</span></p>
        </div>
      </Modal>

      {/* Independent Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onRequestClose={() => setIsMessageModalOpen(false)}
        contentLabel="Message"
        className={`message-modal ${messageType === 'success' ? 'success' : 'error'}`} // Conditionally apply class
        overlayClassName="message-modal-overlay"
      >
        <div className="message-content">
          <p>{message}</p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
