import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductsCarts.css';
import './ProductDetailModal.css'; // Import the new CSS file

function ProductsCarts({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductView = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/productos/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Error al cargar los productos.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [token]);

  if (loading) {
    return <div className="products-container">Cargando productos...</div>;
  }

  if (error) {
    return <div className="products-container error-message">{error}</div>;
  }

  return (
    <div className="products-container">
      <button onClick={handleGoBack} className="back-button">← Volver</button>
      <div className="products-header">
        <h2 className="products-title">Nuestros Productos</h2>
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
              {product.imagen_url && (
                <div className="product-image-container">
                  <img 
                    src={product.imagen_url} 
                    alt={product.nombre}
                    className="product-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                </div>
              )}
              <div className="product-info">
                <h3 className="product-name">{product.nombre}</h3>
                <p className="product-price">${product.precio}</p>
                <p className="product-description">{product.descripcion_marketing || 'Sin descripción.'}</p>
                <div className="product-meta">
                  <span className="product-id">ID: {product.id}</span>
                  {product.descripcion_marketing && <span className="ai-badge">Con IA</span>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      {selectedProduct && (
        <div className="enlarged-product-overlay" onClick={handleCloseProductView}>
          <div className="enlarged-product-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseProductView}>X</button>
            <img src={selectedProduct.imagen_url} alt={selectedProduct.nombre} className="enlarged-product-image" />
            <div className="enlarged-product-details">
              <h3>{selectedProduct.nombre}</h3>
              <p>${selectedProduct.precio}</p>
              <p>{selectedProduct.descripcion_marketing}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsCarts;