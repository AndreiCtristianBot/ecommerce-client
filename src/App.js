// App.js
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import { AuthProvider, AuthContext } from './AuthContext';
import './styles.css';

function AppContent({ cart, setCart, handleAddToCart, handleRemoveFromCart, total }) {
  const location = useLocation();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setToken(tokenFromUrl);  // Actualizează contextul cu noul token
      window.history.replaceState({}, document.title, "/");
    }
  }, [location, setToken]);

  return (
    <>
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} onAddToCart={handleAddToCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/cart" element={<Cart cart={cart} total={total} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} total={total} setCart={setCart} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
      </Routes>
    </>
  );
}

export default function App() {
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

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const prodId = Number(product.id);
      const index = prevCart.findIndex((item) => Number(item.id) === prodId);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    console.log(`Produsul "${product.name}" a fost adăugat în coș!`);
  };

  return (
    <AuthProvider>
      <Router>
        <AppContent 
          cart={cart}
          setCart={setCart}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          total={total}
        />
      </Router>
    </AuthProvider>
  );
}

















