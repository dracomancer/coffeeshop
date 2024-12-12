import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={styles.navbar}>
    <ul style={styles.navList}>
      <li style={styles.navItem}>
        <Link to="/" style={styles.navLink}>Home</Link>
      </li>
      <li style={styles.navItem}>
        <Link to="/menu" style={styles.navLink}>Menu</Link>
      </li>
      <li style={styles.navItem}>
        <Link to="/order" style={styles.navLink}>Order</Link>
      </li>
      <li style={styles.navItem}>
        <Link to="/payment" style={styles.navLink}>Payment</Link>
      </li>
    </ul>
  </nav>
);

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 20px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    justifyContent: 'center', // Center align the navbar items
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '5px', // Rounded corners for the links
    transition: 'background-color 0.3s, color 0.3s', // Smooth hover transition
  },
};

// Add hover effect for the links
styles.navLink[':hover'] = {
  backgroundColor: '#555',
  color: '#ff6347', // Tomato color for hover effect
};

export default Navbar;
