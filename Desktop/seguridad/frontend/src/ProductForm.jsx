import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';

function ProductForm({ token, onProductCreated }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es requerido';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre del producto debe tener al menos 2 caracteres';
    }

    if (!formData.precio) {
      newErrors.precio = 'El precio es requerido';
    } else if (parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser mayor que 0';
    } else if (parseFloat(formData.precio) > 1000000) {
      newErrors.precio = 'El precio debe ser razonable';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setCreatedProduct(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        nombre: formData.nombre.trim(),
        precio: parseFloat(formData.precio),
      };

      const response = await axios.post('http://localhost:8000/productos/', productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      setMessage('✨ ¡Producto creado exitosamente!');
      setCreatedProduct(response.data);
      onProductCreated?.(response.data);
      
      // Reset form
      setFormData({
        nombre: '',
        precio: ''
      });
      setErrors({});
      
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage(error.response?.data?.detail || 'Error al crear el producto. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProducts = () => {
    navigate('/products');
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-header">
          <h2>Crear Nuevo Producto</h2>
          <p>Agrega un nuevo producto a tu catálogo. La IA generará la descripción y la imagen.</p>
        </div>
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Nombre del Producto *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Introduce el nombre del producto (ej. Smartphone, Taza de Café)"
            value={formData.nombre}
            onChange={handleChange}
            className={`form-input ${errors.nombre ? 'error' : ''}`}
            disabled={isLoading}
            maxLength={100}
          />
          {errors.nombre && <span className="field-error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="precio" className="form-label">
            Precio *
          </label>
          <div className="price-input-container">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="0.00"
              value={formData.precio}
              onChange={handleChange}
              className={`form-input ${errors.precio ? 'error' : ''}`}
              disabled={isLoading}
              step="0.01"
              min="0"
              max="1000000"
            />
          </div>
          {errors.precio && <span className="field-error">{errors.precio}</span>}
        </div>

        <button 
          type="submit" 
          className={`form-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          <span className="button-text">
            {isLoading ? 'Creando Producto...' : 'Crear Producto'}
          </span>
          {isLoading && <div className="button-spinner"></div>}
        </button>

        <button 
          type="button" 
          className="form-button view-products-button"
          onClick={handleViewProducts}
        >
          Ver Productos
        </button>
      </form>

      {message && (
        <div className={message.includes('🎉') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      {createdProduct && (
        <div className="created-product-preview">
          <div className="product-card">
            <div className="product-image-container">
              {createdProduct.imagen_url ? (
                <img 
                  src={createdProduct.imagen_url} 
                  alt={createdProduct.nombre}
                  className="product-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
            </div>
            
            <div className="product-info">
              <h4 className="product-name">{createdProduct.nombre}</h4>
              <p className="product-price">${createdProduct.precio}</p>
              <p className="product-description">
                {createdProduct.descripcion_marketing || 'La descripción generada por IA aparecerá aquí'}
              </p>
              
              <div className="product-meta">
                <span className="product-id">ID: {createdProduct.id}</span>
                <span className="ai-badge">Con IA</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductForm;