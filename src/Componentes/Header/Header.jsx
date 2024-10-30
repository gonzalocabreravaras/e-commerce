import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './Header.css';

const Header = () => {
  const categories = ['Hombre', 'Mujer', 'Niños', 'Ofertas 🔥'];

  return (
    <div className="container-header">
      <div className="logo">
        <h2 onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
          Tienda
        </h2>
      </div>

      <div className="menu">
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link to={`/categoria/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>

      <CartWidget />
    </div>
  );
};

export default Header;












