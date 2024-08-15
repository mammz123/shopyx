import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; 

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      navigate('/login'); 
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn">Signup</button>
          <Link 
    to="/login" 
    style={{ 
      textDecoration: "none", 
      color: "white",
    }}
  >
    Already have an account?
  </Link>        </form>
      </div>
    </div>
  );
}

export default Signup;
