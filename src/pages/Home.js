// src/pages/Home.js
import React from 'react';
import ProductList from '../components/ProductList';

function Home({ cart, setCart }) {
  return (
    <div>
      <h1>Welcome to the E-commerce App</h1>
      <ProductList cart={cart} setCart={setCart} />
    </div>
  );
}

export default Home;

