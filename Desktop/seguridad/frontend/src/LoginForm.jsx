import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:8000/token', 
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      localStorage.setItem('token', response.data.access_token);
      setMessage('¡Inicio de sesión exitoso!');
      navigate('/product-form'); // Redirigir al formulario de producto
      onLoginSuccess?.(response.data.access_token);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Inicio de sesión fallido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter your password"
        />
      </div>
      <button 
        type="submit" 
        className={`form-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {message && (
        <p className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </p>
      )}
      <div className="form-footer">
        <p>¿No tienes una cuenta? <Link to="/register" className="register-link">Regístrate</Link></p>
      </div>
    </form>
  );
}

export default LoginForm;