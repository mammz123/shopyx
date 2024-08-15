import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';
import cartImage from './images/cart.png'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!product || !product._id) {
      console.error('Invalid product:', product);
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isProductInCart = savedCart.some(item => item._id === product._id);

    if (!isProductInCart) {
      savedCart.push(product);
      localStorage.setItem('cart', JSON.stringify(savedCart));
      console.log('Product added to cart:', product);
    } else {
      console.log('Product is already in the cart:', product);
    }
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">ShopyX</Link>
        <div className="navbar-search-container">
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>
        <div className="navbar-cart-button-container">
          <Link to="/cart" className="cart-link">
            <button className="cart-button">
              <img src={cartImage} alt="Cart" className="cart-image" /> 
              Go to Cart
            </button>
          </Link>
        </div>
      </nav>
      <div className="product-grid">
        {products.length === 0 ? (
          <p className="no-products">No products available.</p>
        ) : (
          products.map(product => (
            <div className="product-card" key={product._id}>
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="product-image" style={{
                  width: '100%',         
                  height: 'auto',        
                  borderRadius: '8px',   
                  objectFit: 'cover'     
                }}
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
