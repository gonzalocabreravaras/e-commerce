import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ItemListContainer.css';
import { formatCurrency } from '../../Utils/utils';
import db from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = ({ saludo }) => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = categoria ? categoria : saludo;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, 'productos');
        const q = categoria
          ? query(collectionRef, where('categoria', '==', categoria))
          : collectionRef;
  
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [categoria]);
  
  useEffect(() => {
    if (!loading && categoria && products.length === 0) {
      navigate('/404');
    }
  }, [categoria, products, loading, navigate]);

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
          products.length > 0 ? (
            products.map((product) => (
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




















