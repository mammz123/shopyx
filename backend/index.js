const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads'
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cart.findOne({ userId });
    if (cart) {
      res.json(cart);
    } else {
      const newCart = new Cart({ userId, items: [] });
      await newCart.save();
      res.json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

app.post('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
