import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, total }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Coșul de cumpărături</h1>
      {cart.length === 0 ? (
        <p>Coșul este gol.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <Link to="/checkout">
            <button>Comandă</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
