import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // presupunem că afișează produsele
import Register from './pages/Register';
import Login from './pages/Login';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';

function App() {
  // Pentru exemplu, definim un cart dummy și un total
  const dummyCart = [
    { id: 1, name: 'Apple iPhone 14', price: 999.99, quantity: 1 },
    { id: 2, name: 'Samsung Galaxy S22', price: 849.99, quantity: 2 }
  ];
  const total = dummyCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart cart={dummyCart} total={total} />} />
        <Route path="/checkout" element={<Checkout cart={dummyCart} total={total} />} />
      </Routes>
    </Router>
  );
}

export default App;


