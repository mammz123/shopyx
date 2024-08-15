import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </nav>
      <div className="welcome-message">
        <h1>Welcome to ShopyX</h1>
      </div>
    </div>
  );
};

export default HomePage;
