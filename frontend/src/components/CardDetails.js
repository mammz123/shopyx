import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CardDetails.css'; 

const CardDetails = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      setError('All fields are required.');
      return;
    }

    toast.success('Order placed successfully!', {
      position: "top-center", 
      autoClose: 5000, 
    });

    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <div className="card-details-container">
      <div className="card-details">
        <h1>Card Details</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Expiry Date (MM/YY):
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </label>
          <button type="submit">Proceed to Pay</button>
        </form>
        {error && <p>{error}</p>}
      </div>
      <ToastContainer
        position="top-center" 
        autoClose={5000} 
        hideProgressBar={true} 
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />
    </div>
  );
};

export default CardDetails;
