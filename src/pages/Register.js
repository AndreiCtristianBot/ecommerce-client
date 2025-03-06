// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles.css";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define apiUrl from environment variable (fallback to localhost for development)
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/register`, {
        name,
        email,
        password,
      });
      // After registration, redirect user to login page
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Înregistrarea a eșuat');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Înregistrare</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Nume:</label>
          <input
            id="name"
            type="text"
            placeholder="Nume complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Parolă:</label>
          <input
            id="password"
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login">Înregistrează-te</button>
      </form>
    </div>
  );
}

export default Register;

