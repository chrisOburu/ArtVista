import React, { useState } from 'react';
import { registerUser } from '../api';
import './Forms.css';
import LoginForm from './LoginForm';
import Modal from 'react-modal';
import Header from './header';
import Footer from './footer';

Modal.setAppElement('#root');

const RegisterForm = ({ onLoginSuccess }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // State for message modal
  const [messageType, setMessageType] = useState(''); // State for the message type (success or error)

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setIsSubmitting(true);
    setPopupMessage('');
    setMessageType('');
    try {
        const response = await registerUser(formData);

        if (response) setPopupMessage('Registration successful!');
        setMessageType('success'); // Set message type to success
        setIsMessageModalOpen(true); // Show the message modal immediately
        setFormData({
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        // Close the modal after a delay, then navigate to the home page
        setTimeout(() => {
            setIsMessageModalOpen(false);
            //navigate('/');
            openModal();
        }, 3000);
    } catch (error) {
        setPopupMessage(`Registration failed. ${error.message}`);
        setMessageType('error'); // Set message type to error
        setIsMessageModalOpen(true); // Show the message modal immediately
        setTimeout(() => {
            setIsMessageModalOpen(false);
        }, 3000);
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <>
      <Header onLoginSuccess={onLoginSuccess} />
      <h1 className='form-text'>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="register-link">
        <p>
          Already have an account?{' '}
          <span onClick={openModal} className="register-link-text">
            Login
          </span>
        </p>
        <LoginForm
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onLoginSuccess={onLoginSuccess}
        />
      </div>

      {/* Independent Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onRequestClose={() => setIsMessageModalOpen(false)}
        contentLabel="Message"
        className={`message-modal ${messageType === 'success' ? 'success' : 'error'}`} // Conditionally apply class
        overlayClassName="message-modal-overlay"
      >
        <div className="message-content">
          <p>{popupMessage}</p>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default RegisterForm;


