// OrderHistory.js - only imports for React, axios, and react-router-dom
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Mapping for postal code labels by country
const postalCodeOptions = {
  SUA: { label: "ZIP Code", requiredLength: 5 },
  Germania: { label: "Postleitzahl", requiredLength: 5 },
  "Elveția": { label: "Cod postal", requiredLength: 4 },
  Canada: { label: "Postal Code", requiredLength: 6 },
  Romania: { label: "Cod postal", requiredLength: 6 }
};

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchOrders = async () => {
      try {
        // Use API URL from environment variable (fallback to localhost for development)
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const { data } = await axios.get(`${apiUrl}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Fetched orders:', data);
        setOrders(data);
      } catch (err) {
        setError('Nu s-a putut încărca istoricul comenzilor');
        console.error("Eroare la fetch orders:", err.response || err);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      await axios.delete(`${apiUrl}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(prev => prev.filter(order => order.id !== orderId));
      alert('Comanda a fost ștearsă cu succes');
    } catch (err) {
      console.error('Error deleting order:', err.response || err);
      alert('Eroare la ștergerea comenzii');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Istoric Comenzi</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length === 0 ? (
        <p>Nu există comenzi.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px', borderRadius: '0.25rem' }}
          >
            <div style={{ cursor: 'pointer' }} onClick={() => toggleExpand(order.id)}>
              <h3>Comanda #{order.order_token || order.id}</h3>
              <p>Data: {new Date(order.order_date).toLocaleString()}</p>
              <p>Total: ${Number(order.total).toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <p>
                <strong>Țară:</strong> {order.country || 'N/A'} |{' '}
                <strong>
                  {order.country === "SUA" ? "Stat" : 
                   order.country === "Canada" ? "Provincie/Teritoriu" : 
                   order.country === "Germania" ? "Land" : 
                   order.country === "Elveția" ? "Canton" : "Județ/Municipiu"}
                :</strong> {order.county || 'N/A'} |{' '}
                <strong>Oraș:</strong> {order.city || 'N/A'}
              </p>
              <p>
                <strong>{postalCodeOptions[order.country]?.label || "Cod postal"}:</strong> {order.postal_code || 'N/A'}
              </p>
              <p>
                <strong>Zona administrativă:</strong> {order.admin_area || 'N/A'}
              </p>
            </div>
            {expandedOrderId === order.id && (
              <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
                <p><strong>Adresă:</strong> {order.address}</p>
                <p><strong>Telefon:</strong> {order.phone}</p>
                <p><strong>Email:</strong> {order.email}</p>
                {order.items && order.items.length > 0 ? (
                  <div>
                    <strong>Produse comandate:</strong>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          Produs ID: {item.product_id}, Cantitate: {item.quantity}, Preț: ${Number(item.price).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>Nu sunt produse pentru această comandă.</p>
                )}
                {order.status === 'Delivered' && (
                  <button onClick={() => handleDelete(order.id)} style={{ marginTop: '10px' }}>
                    Delete Order
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;












