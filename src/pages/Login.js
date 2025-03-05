// Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token); // Actualizează contextul
      alert('V-ați autentificat cu succes');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Eroare la autentificare');
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Autentificare</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login">Login</button>
      </form>
      <button onClick={handleGoogleLogin} className="google">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" 
          alt="google logo" 
          width="15px" 
          height="15px"
        /> 
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;




