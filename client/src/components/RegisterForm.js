// import React, { useState } from 'react';
// import { registerUser } from '../api';
// import './Forms.css'
// import LoginForm from './LoginForm';
// import { useNavigate } from "react-router-dom";

// const RegisterForm = ({ onLoginSuccess }) => {

//   const navigate = useNavigate();

//   const [modalIsOpen, setModalIsOpen] = useState(false);


//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const errors = {};
//     if (!formData.name) errors.name = 'Name is required';
//     if (!formData.username) errors.username = 'Username is required';
//     if (!formData.email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = 'Email address is invalid';
//     }
//     if (!formData.password) {
//       errors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }
//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await registerUser(formData);
//       console.log(response.data)
//       alert('Registration successful!');
//       setFormData({
//         name: '',
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       });
      
//     let path = '/';

//     navigate(path);
//     } catch (error) {
//       console.error('Registration failed', error);
//       //alert('Registration failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Name</label>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         {errors.name && <span className="error">{errors.name}</span>}

//         <label>Username</label>
//         <input
//           name="username"
//           type="text"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         {errors.username && <span className="error">{errors.username}</span>}

//         <label>Email</label>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {errors.email && <span className="error">{errors.email}</span>}

//         <label>Password</label>
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {errors.password && <span className="error">{errors.password}</span>}

//         <label>Confirm Password</label>
//         <input
//           name="confirmPassword"
//           type="password"
//           placeholder="Confirm Password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//         />
//         {errors.confirmPassword && (
//           <span className="error">{errors.confirmPassword}</span>
//         )}

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Registering...' : 'Register'}
//         </button>


//       </form>
//       <div className="register-link">
//         <p>Already have an account? <span onClick={openModal} className="register-link-text">Login</span></p>
//         <LoginForm
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           onLoginSuccess={onLoginSuccess}
//         //onSuccess={handleLogin}

//         />
//       </div>

//     </>
//   );
// };

// export default RegisterForm;


import React, { useState } from 'react';
import { registerUser } from '../api';
import './Forms.css';
import LoginForm from './LoginForm';
import Popup from './Popup';
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
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
    try {
      const response = await registerUser(formData);
      setPopupMessage('Registration successful!');
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/');
    } catch (error) {
      setPopupMessage(`Registration failed. ${error}`);
      //console.error('Registration failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setPopupMessage('');
  };

  return (
    <>
      <h1>Register</h1>
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
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
    </>
  );
};

export default RegisterForm;

