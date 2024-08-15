import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (Array.isArray(savedCart)) {
      setCart(savedCart);
    } else {
      console.error('Unexpected cart data format:', savedCart);
    }
  }, []);

  const updateQuantity = (productId, change) => {
    if (!productId || (change !== 1 && change !== -1)) {
      console.error('Invalid parameters for updateQuantity:', productId, change);
      return;
    }

    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        const newQuantity = Math.max(1, (item.quantity || 1) + change); 
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    if (!productId) {
      console.error('Invalid product ID:', productId);
      return;
    }

    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 1;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  const handleBuy = () => {
    navigate('/payment', { state: { cart } });
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <ul>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            item && item._id ? (
              <li key={item._id} className="cart-item">
                <div className="product-info">
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    className="product-image" style={{height:"200px"}}
                  />
                  <div className="details">
                    <h3>{item.name}</h3>
                    {/* <p>{item.description}</p> */}
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className="quantity-control">
                  <h4>Quantity:</h4>
                  <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
              </li>
            ) : (
              <p key="error"></p>
            )
          ))
        )}
      </ul>
      {cart.length > 0 && (
        <div>
          <h2 className="total-price">Total Price: ${calculateTotalPrice()}</h2>
          <button className="buy-button" onClick={handleBuy}>Buy All</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
