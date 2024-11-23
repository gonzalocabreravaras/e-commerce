import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getCartCount();

  return (
    <div 
      className="cart-widget" 
      onClick={() => navigate('/cart')} 
      style={{ cursor: 'pointer' }}
    >
      <i className="fa fa-bag-shopping fa-md"></i>
      {itemCount > 0 && <span className="item-count">{itemCount}</span>}
    </div>
  );
};

export default CartWidget;
