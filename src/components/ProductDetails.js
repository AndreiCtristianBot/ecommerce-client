import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Define apiUrl using environment variable (with fallback for development)
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id, apiUrl]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await axios.post(
        `${apiUrl}/api/cart`,
        { productId: id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
