import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ItemListContainer.css';
import { formatCurrency } from '../../Utils/utils';

const ItemListContainer = ({ saludo, products }) => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const filteredProducts = categoria
    ? products.filter((product) => product.categoria === categoria)
    : products;

  const title = categoria ? categoria : saludo;

  useEffect(() => {
    const loadProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (categoria && !loading && filteredProducts.length === 0) {
      navigate('/404');
    }
  }, [categoria, filteredProducts, loading, navigate]);

  return (
    <div className="container-app">
      {loading ? (
        <Skeleton height={40} style={{ borderRadius: '0.5rem' }} />
      ) : (
        <h2>{title}</h2> 
      )}
      <div className="row">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div className="container-card col-md-3" key={index}>
              <div className="card mt-5 no-border">
                <Skeleton height={200} style={{ borderRadius: '0.5rem' }} />
                <div className="card-body">
                  <Skeleton height={30} style={{ borderRadius: '0.5rem' }} />
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="container-card col-md-3" key={product.id}>
                <div className="card mt-5">
                  <img
                    src={product.imagen || 'placeholder-image-url.jpg'}
                    className="card-img-top"
                    alt={product.nombre}
                  />
                  <div className="card-body">
                  <p className="card-text">{product.categoria}</p>
                    <h5 className="card-title">{product.nombre}</h5>
                    <p className="card-text">{formatCurrency(product.precio)} CLP</p>
                    <button
                      className="btn btn-primary btn-style"
                      onClick={() => navigate(`/producto/${product.id}`)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No se encontraron productos en esta categoría.</div>
          )
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;

































