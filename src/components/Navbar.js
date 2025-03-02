// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar({ cart, setCart }) {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const toggleCartDropdown = () => {
    setDropdownActive(prev => !prev);
  };

  const handleRemoveFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const total = cart.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);

  return (
    <header className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {!token && <Link to="/register">Înregistrare</Link>}
        {!token && <Link to="/login">Login</Link>}
        {token && <Link to="/orders">Istoric Comenzi</Link>}
      </div>
      <div className="title">My Premium E-commerce</div>
      <div className="cart-container" onClick={toggleCartDropdown}>
        <span className="cart-icon">Coș 🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        <div className={`cart-dropdown ${dropdownActive ? 'active' : ''}`}>
          <div className="dropdown-header">Coșul tău</div>
          {cartCount === 0 ? (
            <p style={{ padding: '10px', textAlign: 'center' }}>Nu aveți niciun produs în coș</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <div>
                      {item.name} - ${Number(item.price).toFixed(2)} x {item.quantity}
                    </div>
                    <button
                      className="btn-danger"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Elimină
                    </button>
                  </li>
                ))}
              </ul>
              <div className="dropdown-footer">Total: ${Number(total).toFixed(2)}</div>
              <button
                className="btn-order"
                onClick={() => {
                  if (!token) {
                    navigate('/login');
                  } else {
                    navigate('/checkout');
                  }
                }}
              >
                Comandă
              </button>
            </>
          )}
        </div>
      </div>
      {token && <button className="logout" onClick={handleLogout} style={{marginLeft: '15px', padding: '5px', cursor: 'hover'}}>Logout</button>}
    </header>
  );
}

export default Navbar;








