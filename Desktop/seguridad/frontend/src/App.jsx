import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ProductForm from './ProductForm';
import ProductsCarts from './ProductsCarts';
import './App.css';
import './RegisterForm.css';
import './LoginForm.css'; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route 
            path="/product-form" 
            element={token ? <ProductForm token={token} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />
          <Route 
            path="/products" 
            element={token ? <ProductsCarts token={token} /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
  );
}

export default App;
