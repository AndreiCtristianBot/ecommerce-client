// ProductCard.js
import React from 'react';

function ProductCard({ product, onAddToCart }) {
  // Verificăm dacă există un URL nevid
  const hasImage =
    product &&
    product.image_url &&
    product.image_url.trim() !== '';

  // Verificăm dacă URL-ul începe cu "http://" sau "https://"
  const validImage =
    hasImage &&
    (product.image_url.startsWith('http://') || product.image_url.startsWith('https://'));

  // Convertim prețul la număr
  const price = Number(product?.price) || 0;

  return (
    <div
      style={{
        border: '1px solid #ccc',
        margin: '10px',
        padding: '10px',
        width: '200px'
      }}
    >
      {validImage ? (
        <img
          src={product.image_url}
          alt={product?.name || 'Produs fără nume'}
          style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : null}
      <h3>{product?.name || 'Fără nume'}</h3>
      <p>{product?.description || 'Fără descriere'}</p>
      <p>Preț: ${price.toFixed(2)}</p>
      <button
        onClick={() => product && onAddToCart(product)}
        style={{ padding: '5px 10px', cursor: 'pointer' }}
      >
        Adaugă în coș
      </button>
    </div>
  );
}

export default ProductCard;


