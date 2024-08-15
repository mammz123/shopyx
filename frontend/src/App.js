import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Shop from './components/Shop';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import Cart from './components/Cart'; 
import Payment from './components/Payment';
import CardDetails from './components/CardDetails';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shopy" element={<ProductList />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/payment" element={<Payment />} />
        <Route path="/card-details" element={<CardDetails />} />


      </Routes>
    </Router>
  );
}

export default App;
