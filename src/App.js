// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';

function App() {
  const [cart, setCart] = useState([]);

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  useEffect(() => {
    console.log("Saving cart to localStorage:", cart, "Total:", total);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());
  }, [cart, total]);

  const handleRemoveFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart cart={cart} total={total} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} total={total} />} />
      </Routes>
    </Router>
  );
}

export default App;









