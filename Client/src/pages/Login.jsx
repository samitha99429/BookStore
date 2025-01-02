import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin(); 
      window.location.href = '/';
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="log-container">
      <div className="loginCard">
        <div className="text-center mb-4">
          <h2 className="logoText">Readify</h2>
        </div>
        <h3 className="text-center mb-4">Sign in</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="sign-btn btn-block">SIGN IN</button>
          </div>
        </form>
        <div className="account-text text-center mt-4">
          <p>Don't have an account? <a href="/register">Create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;