import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';

function Shop() {
  return (
    <div>
      <nav className="navbar">
      </nav>
      <h1>Shop</h1>
      <ProductList />
      <div className="cart-button-container">
        <Link to="/cart">
          <button className="cart-button">Go to Cart</button>
        </Link>
      </div>
    </div>
  );
}

export default Shop;
