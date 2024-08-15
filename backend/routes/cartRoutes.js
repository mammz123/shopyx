const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/add-to-cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'User ID and Product ID are required' });
  }

  try {
    let cart = await cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
      await cart.save();
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

router.get('/view-cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

module.exports = router;
