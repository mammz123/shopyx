import React from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const AddToCartButton = ({ productId }) => {
  const { user } = useUser();

  const handleAddToCart = async () => {
    if (!user) {
      alert('You need to log in to add items to the cart.');
      return;
    }

    try {
      await axios.post('/api/cart/add-to-cart', {
        userId: user._id, 
        productId,
        quantity: 1 
      });
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
