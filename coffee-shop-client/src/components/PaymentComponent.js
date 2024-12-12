import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PaymentComponent.css';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;
  const totalAmount = location.state?.totalAmount || 0; // Default to 0 if undefined
  const [method, setMethod] = useState('');

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!method) {
      alert('Please select a payment method.');
      return;
    }

    try {
      // Step 1: Process payment (mocking here)
      const response = await axios.post('http://localhost:3000/payments', {
        orderId,
        amount: totalAmount,
        method,
      });

      // Step 2: If payment is successful, navigate to the order confirmation page
      if (response.data.success) {
        navigate('/order-check', {
          state: {
            orderId,
            paymentStatus: 'successful',
            totalAmount,
            paymentId: response.data.paymentId,
          },
        });
      }
    } catch (error) {
      alert('Error processing payment! Please try again.');
      console.error('Payment Error:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Process Payment</h2>
      <div className="payment-summary">
        <p><strong>Total Amount:</strong> ${totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}</p>
      </div>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="method">Choose Payment Method:</label>
          <div className="button-group">
            <div
              className={`payment-box ${method === 'credit_card' ? 'selected' : ''}`}
              onClick={() => setMethod('credit_card')}
            >
              <span>Credit Card</span>
            </div>
            <div
              className={`payment-box ${method === 'qris' ? 'selected' : ''}`}
              onClick={() => setMethod('qris')}
            >
              <span>QRIS</span>
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;
