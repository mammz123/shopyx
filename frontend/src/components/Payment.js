import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css'; 

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 1;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  const handleProceed = () => {
    navigate('/card-details', { state: { cart } });
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Page</h1>
      <h2 className="payment-cart-title">Your Cart:</h2>
      <ul className="payment-cart-list">
        {cart.length === 0 ? (
          <p className="payment-empty-cart">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            item && item._id ? (
              <li key={item._id} className="payment-cart-item">
                <h3 className="payment-item-name">{item.name}</h3>
                <p className="payment-item-details">Quantity: {item.quantity || 1}</p>
                <p className="payment-item-details">Price: ${parseFloat(item.price).toFixed(2)}</p>
                <p className="payment-item-details">Total: ${(item.quantity || 1) * parseFloat(item.price).toFixed(2)}</p>
              </li>
            ) : (
              <p key="error" className="payment-error"></p>
            )
          ))
        )}
      </ul>
      {cart.length > 0 && (
        <h2 className="payment-total-price">Total Price: ${calculateTotalPrice()}</h2>
      )}
      <button className="payment-proceed-button" onClick={handleProceed}>Proceed to Payment</button>
    </div>
  );
};

export default Payment;
