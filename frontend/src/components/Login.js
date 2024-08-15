import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const { isAdmin, userId } = decodedToken;

      localStorage.setItem('userId', userId);

      if (isAdmin) {
        navigate('/admin'); 
      } else {
        navigate('/shopy'); 
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
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
          <button type="submit" className="btn">Login</button>
        </form>
        <Link 
    to="/signup" 
    style={{ 
      textDecoration: "none", 
      color: "white", 
    }}
  >
    Don't have an account?
  </Link>    

      </div>
    </div>
  );
}

export default Login;
