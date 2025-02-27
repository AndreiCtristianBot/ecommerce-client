import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Dacă ai configurat proxy în package.json, folosește calea relativă:
        // const { data } = await axios.get('/api/products');
        
        // Dacă nu ai proxy, asigură-te că folosești portul corect (8000):
        const { data } = await axios.get('http://localhost:8000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
    console.log(`Produsul "${product.name}" a fost adăugat în coș!`);
  };

  return (
    <div>
      <h2>Produse disponibile</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p>Nu au fost găsite produse.</p>
        )}
      </div>

      <h2>Coș ({cart.length} produse)</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
