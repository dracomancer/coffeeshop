// src/OrderCheckComponent.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrderCheckComponent.css';

const OrderCheckComponent = () => {
  const location = useLocation();
  const { orderId, paymentStatus, totalAmount, paymentId } = location.state || {};
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${orderId}`);
        if (response.data.success) {
          setOrderDetails(response.data.data);
          setError('');
        } else {
          setError('Order not found.');
        }
      } catch (error) {
        setError('Payment Sucessful.');
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="order-check-container">
      <h2>Order Status</h2>

      {/* Display the payment information */}
      <p><strong>Payment Status:</strong> {paymentStatus}</p>
      <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>

      {error && <p className="error-message">{error}</p>}

      {orderDetails && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Customer Name:</strong> {orderDetails.customer_name}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item.item_name} - ${item.price}</li>
            ))}
          </ul>
          <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default OrderCheckComponent;
