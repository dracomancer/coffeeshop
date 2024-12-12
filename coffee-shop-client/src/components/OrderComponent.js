// src/OrderComponent.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/OrderComponent.css';  // Import the CSS file

const OrderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];
  const [customerName, setCustomerName] = useState('');

  // Calculate the total amount of the selected items
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!customerName) {
      alert('Please enter your name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/orders', {
        customer_name: customerName,
        items: selectedItems.map(item => ({
          item_name: item.item_name,
          quantity: 1,
          price: item.price,
        })),
      });
      navigate('/payment', { 
        state: { 
          orderId: response.data.orderId, 
          totalAmount, // Pass totalAmount to PaymentComponent
        }
      });
    } catch (error) {
      alert('Error creating order!');
    }
  };

  return (
    <div className="order-container">
      <h2>Create Your Order</h2>
      <ul className="order-list">
        {selectedItems.map((item, index) => (
          <li key={index}>
            <p>{item.item_name} - ${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="total-amount">
        <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderComponent;
