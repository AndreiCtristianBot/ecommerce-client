// Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart: propsCart, total: propsTotal }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Folosim props dacă sunt disponibile, altfel încercăm să preluăm din localStorage
  const [cart, setCart] = useState(
    propsCart && propsCart.length > 0 ? propsCart : JSON.parse(localStorage.getItem('cart')) || []
  );
  const [total, setTotal] = useState(
    propsTotal ? Number(propsTotal) : Number(localStorage.getItem('total')) || 0
  );

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ramburs'); // implicit "Ramburs la livrare"
  const [error, setError] = useState('');

  // Dacă nu este autentificat, redirecționează la login
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Recalculăm totalul pe baza conținutului din coș, în cazul în care se modifică (optional)
  useEffect(() => {
    const calculatedTotal = cart.reduce(
      (acc, item) => acc + Number(item.price) * (item.quantity || 1),
      0
    );
    setTotal(calculatedTotal);
  }, [cart]);

  // Formularul este valid dacă toate câmpurile sunt completate
  const isFormValid =
    address.trim() && phone.trim() && email.trim() && paymentMethod.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Vă rugăm completați toate câmpurile.');
      return;
    }
    try {
      const orderData = {
        address,
        phone,
        email,
        paymentMethod,
        total, // totalul preluat din starea calculată sau din props/localStorage
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      await axios.post('http://localhost:8000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Comanda a fost trimisă cu succes!');
      navigate('/');
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
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefon:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Modalitate de plată:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="ramburs">Ramburs la livrare</option>
            <option value="card">Card</option>
          </select>
        </div>
        <div>
          <p>Total: ${total.toFixed(2)}</p>
        </div>
        <button type="submit" disabled={!isFormValid}>
          Trimite Comanda
        </button>
      </form>
    </div>
  );
}

export default Checkout;





