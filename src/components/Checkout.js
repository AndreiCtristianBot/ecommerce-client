import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, total }) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  // Dacă nu e logat, redirecționează către login
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        address,
        phone,
        email,
        total,
        items: cart.map(item => ({
          product_id: item.id, // asigură-te că item.id reprezintă ID-ul produsului
          quantity: item.quantity,
          price: item.price
        }))
      };

      await axios.post('http://localhost:8000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Comanda a fost plasată cu succes!');
      navigate('/'); // redirecționează spre home
    } catch (err) {
      console.error(err);
      setError('Eroare la trimiterea comenzii');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Checkout</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Adresă:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Telefon:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <p>Total: ${total.toFixed(2)}</p>
        </div>
        <button type="submit">Trimite Comanda</button>
      </form>
    </div>
  );
}

export default Checkout;
