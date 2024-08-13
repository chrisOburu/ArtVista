import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';

import LandingPage from './components/LandingPage';
import UserProfile from './components/UserProfile';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (accessToken) => {
    setToken(accessToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onLoginSuccess={handleLoginSuccess}/>} />
        <Route path="/register" element={<RegisterForm onLoginSuccess={handleLoginSuccess}/>} />
        {/* <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} /> */}
        <Route path="/profile" element={<UserProfile token={token} />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/submit-project" element={<ProjectForm token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
