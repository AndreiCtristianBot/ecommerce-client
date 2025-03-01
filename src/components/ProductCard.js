// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  // Navighează la detaliile produsului atunci când se dă click pe card (excepție buton)
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Pentru buton, oprim propagarea evenimentului
  const handleButtonClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  // Validare imagine
  const hasImage = product && product.image_url && product.image_url.trim() !== '';
  const validImage =
    hasImage &&
    (product.image_url.startsWith('http://') || product.image_url.startsWith('https://'));
  const price = Number(product?.price) || 0;

  return (
    <div className="product-card" onClick={handleCardClick}>
      {validImage && (
        <img
          src={product.image_url}
          alt={product?.name || 'Produs fără nume'}
        />
      )}
      <div className="product-card-body">
        <div className="product-card-title">{product?.name || 'Fără nume'}</div>
        <div className="product-card-price">Preț: ${price.toFixed(2)}</div>
      </div>
      <div className="product-card-footer">
        <button className="btn" onClick={handleButtonClick}>
          Adaugă în coș
        </button>
      </div>
    </div>
  );
}

export default ProductCard;




