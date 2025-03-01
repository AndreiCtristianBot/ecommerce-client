// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, total, setCart }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // State pentru formular
  const [county, setCounty] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('ramburs'); // implicit Ramburs la livrare
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Resetăm orașul atunci când se schimbă județul
  useEffect(() => {
    setCity('');
  }, [county]);

  // Formularul este valid dacă toate câmpurile sunt completate (inclusiv județul și orașul)
  const isFormValid =
    county.trim() &&
    city.trim() &&
    address.trim() &&
    phone.trim() &&
    email.trim() &&
    paymentMethod.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Coșul este gol.');
      return;
    }
    if (!isFormValid) {
      setError('Vă rugăm completați toate câmpurile.');
      return;
    }
    try {
      const orderData = {
        county,  // Județul selectat
        city,    // Orașul selectat
        address,
        phone,
        email,
        paymentMethod,
        total,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      await axios.post('http://localhost:8000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Comanda a fost trimisă cu succes!');
      setCart([]); // Golește coșul global
      navigate('/');
    } catch (err) {
      console.error('Order submission error:', err.response ? err.response.data : err);
      setError('Eroare la trimiterea comenzii: ' + (err.response?.data?.message || ''));
    }
  };

  // Lista de județe (exemplu)
  const counties = [
    'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrita-Nasaud', 'Brașov',
    'Cluj', 'Constanța', 'Giurgiu', 'Iași', 'Ilfov', 'Maramureș', 'Sibiu',
    'Timis', 'Municipiul București'
  ];

  // Mapping pentru orașe – câteva orașe majore pentru fiecare județ (exemplu)
  const countyCities = {
    'Alba': ['Alba Iulia', 'Aiud', 'Cugir', 'Ocna Mureș'],
    'Arad': ['Arad', 'Lipova', 'Nădlac', 'Ineu'],
    'Argeș': ['Pitești', 'Câmpulung', 'Curtea de Argeș', 'Mioveni'],
    'Bacău': ['Bacău', 'Onești', 'Dărmănești', 'Comănești'],
    'Bihor': ['Oradea', 'Beiuș', 'Salonta', 'Marghita'],
    'Bistrita-Nasaud': ['Beclean', 'Bistrita', 'Năsăud', 'Salva', 'Maieru'],
    'Brașov': ['Brașov', 'Râșnov', 'Făgăraș', 'Săcele'],
    'Cluj': ['Cluj-Napoca', 'Turda', 'Dezmir', 'Câmpia Turzii'],
    'Constanța': ['Constanța', 'Mangalia', 'Medgidia', 'Techirghiol'],
    'Giurgiu': ['Giurgiu', 'Bolintin-Vale', 'Călugăreni'],
    'Iași': ['Iași', 'Pașcani', 'Hârlău', 'Târgu Frumos'],
    'Ilfov': ['Buftea', 'Bragadiru', 'Chitila'],
    'Maramureș': ['Baia Mare', 'Sighetu Marmației', 'Târgu Lăpuș', 'Tăuții-Măgherăuș'],
    'Sibiu': ['Sibiu', 'Mediaș', 'Avrig', 'Cisnădie'],
    'Timis': ['Timișoara', 'Lugoj', 'Făget'],
    'Municipiul București': ['Sectorul 1', 'Sectorul 2', 'Sectorul 3', 'Sectorul 4'],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Checkout</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Județ:</label>
          <select
            className="form-control"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
          >
            <option value="">Selectează județul</option>
            {counties.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {county && countyCities[county] && (
          <div className="form-group">
            <label>Oraș:</label>
            <select
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Selectează orașul</option>
              {countyCities[county].map((cityName, index) => (
                <option key={index} value={cityName}>{cityName}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Adresă:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Telefon:</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Modalitate de plată:</label>
          <select
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="ramburs">Ramburs la livrare</option>
            <option value="card">Card</option>
          </select>
        </div>
        <div className="form-group">
          <p>Total: ${Number(total).toFixed(2)}</p>
        </div>
        <button type="submit" className="btn" disabled={!isFormValid}>
          Trimite Comanda
        </button>
      </form>
    </div>
  );
}

export default Checkout;











