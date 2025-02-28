// Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, total, onRemoveFromCart }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleOrder = () => {
    if (!token) {
      // Dacă nu este autentificat, redirecționează la login
      navigate('/login');
    } else {
      // Dacă este autentificat, navighează la pagina de checkout
      navigate('/checkout');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Coșul de cumpărături</h1>
      {cart.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                <button
                  onClick={() => onRemoveFromCart(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Elimină
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          {cart.length > 0 && (
            <button onClick={handleOrder} style={{ marginTop: '10px' }}>
              Comandă
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;

