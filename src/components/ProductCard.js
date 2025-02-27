import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      {/* Afișează imaginea produsului */}
      <img
        src={product.imageUrl} 
        alt={product.name} 
        style={{ width: '200px', height: 'auto' }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Preț: ${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Adaugă în coș</button>
    </div>
  );
}

export default ProductCard;
