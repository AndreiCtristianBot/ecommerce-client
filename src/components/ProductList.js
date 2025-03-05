// src/components/ProductList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Importă CSS pentru paginare

function ProductList({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 28;
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

  // Calculează indexul primului și ultimului produs pentru pagina curentă
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Determină numărul total de pagini
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Funcție pentru schimbarea paginii
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Funcția de adăugare în coș (neafectată)
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

  // Calculăm totalul pe baza conținutului din coșul global (neafectat)
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
  
  const renderPagination = () => (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`pagination-button ${number === currentPage ? 'selected' : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <h2>Produse disponibile</h2>
      {/* Paginația apare deasupra listei */}
      {renderPagination()}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
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
      {/* Paginația apare și dedesubt */}
      {renderPagination()}
    </div>
  );
}

export default ProductList;













