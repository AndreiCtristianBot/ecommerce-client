// src/pages/OrderHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(data);
      } catch (err) {
        setError('Nu s-a putut încărca istoricul comenzilor');
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Istoric Comenzi</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length === 0 ? (
        <p>Nu există comenzi</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>Comanda #{order.id}</h3>
            <p>Data: {new Date(order.order_date).toLocaleString()}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
            <h4>Produse:</h4>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  Produs ID: {item.product_id}, Cantitate: {item.quantity}, Preț: ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;


