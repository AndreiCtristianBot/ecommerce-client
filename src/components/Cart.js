// src/components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, total, onRemoveFromCart }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleOrder = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1 className="text-center">Coșul de cumpărături</h1>
      {cart.length === 0 ? (
        <p className="text-center">Coșul este gol.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${Number(item.price).toFixed(2)} x {item.quantity}
                <button className="btn-danger" onClick={() => onRemoveFromCart(index)} style={{ marginLeft: '10px' }}>
                  Elimină
                </button>
              </li>
            ))}
          </ul>
          <p className="text-center"><strong>Total: ${Number(total).toFixed(2)}</strong></p>
          {cart.length > 0 && (
            <div className="text-center">
              <button className="btn-order" onClick={handleOrder}>
                Comandă
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;



