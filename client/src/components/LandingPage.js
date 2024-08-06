import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to ArtVista</h1>
        <p>Discover inspiring projects and showcase your work.</p>
        <Link to="/register">Sign Up</Link>
        <Link to="/projects">View Projects</Link>
      </header>
      {/* Add Project Grid and other content */}
    </div>
  );
};

export default LandingPage;
