
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css';
import Header from './Componentes/Header/Header';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import ProductDetail from './Componentes/ProductDetail/ProductDetail';
import Cart from './Componentes/Cart/Cart';
import NotFound from './Componentes/NotFound/NotFound';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route 
            path="/categoria/:categoria" 
            element={<ItemListContainer />} 
          />
          <Route 
            path="/producto/:id" 
            element={<ProductDetail />} 
          />
          <Route 
            path="/cart" 
            element={<Cart />} 
          />
          <Route 
            path="/" 
            element={<ItemListContainer saludo="Bienvenidos a la Tienda" />} 
          />
          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;


























