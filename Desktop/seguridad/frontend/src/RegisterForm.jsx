import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegisterForm.css';

function RegisterForm({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/register', { 
        email: formData.email, 
        password: formData.password 
      });
      setMessage(response.data.message || 'Registration successful!');
      onRegisterSuccess?.(response.data);
      // Reset form on success
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-header">
        <h2>Crear Cuenta</h2>
        <p>¡Únete hoy! Completa tus datos para comenzar.</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          placeholder="Enter your email"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className={`form-input ${errors.password ? 'error' : ''}`}
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
          placeholder="Create a password"
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={isLoading}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
      </div>

      <button 
        type="submit" 
        className={`form-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        <span className="button-text">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </span>
        {isLoading && <div className="button-spinner"></div>}
      </button>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <div className="form-footer">
        <p>¿Ya tienes una cuenta? <Link to="/login" className="login-link">Inicia sesión</Link></p>
      </div>
    </form>
  );
}

export default RegisterForm;