// src/ReceiptComponent.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ReceiptComponent = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [receiptCode, setReceiptCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Order ID:', orderId); // Debug: Log the orderId

    if (!orderId) {
      setError('Order ID is missing.');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:3000/receipt/${orderId}`)
      .then(response => {
        if (response.data.receiptCode) {
          setReceiptCode(response.data.receiptCode);
        } else {
          setError('No receipt found for this order.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error generating receipt! Please try again later.');
        console.error('Receipt Error:', err);
        setLoading(false);
      });
  }, [orderId]);

  return (
    <div>
      <h2>Receipt</h2>
      {loading && <p>Loading receipt...</p>}
      {error && <p>{error}</p>}
      {receiptCode && <p>Receipt Code: {receiptCode}</p>}
    </div>
  );
};

export default ReceiptComponent;
