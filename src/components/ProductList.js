// src/components/ProductList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

function ProductList({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isAdding = useRef(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/products');
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Funcția de adăugare în coș folosind starea globală
  const handleAddToCart = (product) => {
    if (isAdding.current) return; // Previne dublarea apelurilor
    isAdding.current = true;

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
    setTimeout(() => {
      isAdding.current = false;
    }, 0);
  };

  // Funcția de eliminare din coș, care poate fi folosită și aici (dacă dorești să arăți și coșul în ProductList)
  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== indexToRemove));
  };

  // Calculăm totalul pe baza conținutului din coșul global
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div>
      <h2>Produse disponibile</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p>Nu au fost găsite produse.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;











