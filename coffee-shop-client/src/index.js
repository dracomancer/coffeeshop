import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals'; // Optional performance logging

const root = ReactDOM.createRoot(document.getElementById('root')); // Target the root div in public/index.html

root.render(
  <React.StrictMode>
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);

// If you want to measure performance in your app, pass a callback to log results (e.g., reportWebVitals(console.log))
// You can also send the metrics to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
