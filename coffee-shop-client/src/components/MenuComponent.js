import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuComponent.css';

const MenuComponent = () => {
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/menu')
      .then(response => setMenu(response.data.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const addItem = (item) => {
    setSelectedItems(prev => [...prev, item]);
  };

  const goToOrderPage = () => {
    navigate('/order', { state: { selectedItems } });
  };

  return (
    <div className="menu-container">
      <h2 className="menu-header">Our Menu</h2>
      <div className="menu-grid">
        {menu.map(item => (
          <div className="menu-box" key={item.id}>

            <div className="menu-details">
              <h3>{item.item_name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <p>{item.description}</p>
            </div>
            <button className="add-button" onClick={() => addItem(item)}>Add to Order</button>
          </div>
        ))}
      </div>
      <button className="order-button" onClick={goToOrderPage}>Go to Order Page</button>
    </div>
  );
};

export default MenuComponent;
