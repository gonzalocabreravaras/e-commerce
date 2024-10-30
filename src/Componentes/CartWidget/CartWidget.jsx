import React from 'react';
import './CartWidget.css';

const CartWidget = () => {
  const itemCount = 0; 

  return (
    <div className="cart-widget">
      <i className="fa fa-bag-shopping fa-md"></i>
      {itemCount > 0 && <span className="item-count">{itemCount}</span>}
    </div>
  );
};

export default CartWidget;
