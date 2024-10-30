import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Componentes/Header/Header';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import fetchProducts from './Api/ProductsApi';
import ProductDetail from './Componentes/ProductDetail/ProductDetail';
import NotFound from './Componentes/NotFound/NotFound';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const items = await fetchProducts();
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // if (loading) return <div>Cargando productos...</div>;

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/categoria/:categoria" 
          element={<ItemListContainer saludo="¡Bienvenido a nuestra tienda oficial! ⚽" products={products} />} 
        />
        <Route path="/producto/:id" element={<ProductDetail products={products} />} />
        <Route path="/" element={<ItemListContainer saludo="¡Bienvenido a nuestra tienda oficial! ⚽" products={products} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;















