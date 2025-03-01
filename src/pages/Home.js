// src/pages/Home.js
import React from 'react';
import ProductList from '../components/ProductList';

function Home({ cart, setCart, onAddToCart }) {
  return (
    <div className="container text-center">
      <h1 style={{textAlign: 'center'}}>Welcome to the E-commerce App</h1>
      <ProductList cart={cart} setCart={setCart} onAddToCart={onAddToCart} />
    </div>
  );
}

export default Home;


