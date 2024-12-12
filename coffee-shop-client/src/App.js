import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuComponent from './components/MenuComponent';
import OrderComponent from './components/OrderComponent';
import PaymentComponent from './components/PaymentComponent';
import OrderCheckComponent from './components/OrderCheckComponent';
import Carousel from './components/Carousel'; // Import the Carousel component

const HomeComponent = () => (
  <div>
    <Carousel />
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Welcome to the Coffee Shop!</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        Enjoy the best coffee in town! Place your orders, make payments, and check your order status easily.
      </p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeComponent />} /> {/* Homepage */}
        <Route path="/menu" element={<MenuComponent />} /> {/* Menu List */}
        <Route path="/order" element={<OrderComponent />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/order-check" element={<OrderCheckComponent />} /> {/* Order Check page */}
      </Routes>
    </Router>
  );
};

export default App;
