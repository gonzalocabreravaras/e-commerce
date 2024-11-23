import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatCurrency } from '../../Utils/utils';
import db from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('Producto no encontrado!');
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1); // Reset quantity after adding
    }
  };

  if (!product && !loading) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="container-detail">
      <div className="box-img">
        {loading ? (
          <Skeleton height={300} width={300} style={{ borderRadius: '0.5rem' }} />
        ) : (
          <img src={product.imagen || 'placeholder-image-url.jpg'} alt={product.nombre} className="img-fluid" />
        )}
      </div>
      <div className="box-info">
        <h5>{loading ? <Skeleton width={100} /> : product.categoria}</h5>
        <h2>{loading ? <Skeleton width={200} /> : product.nombre}</h2>
        <p>{loading ? <Skeleton count={3} /> : product.descripcion}</p>
        <h4>{loading ? <Skeleton width={100} /> : `${formatCurrency(product.precio)} CLP`}</h4>
        
        {!loading && (
          <div className="quantity-controls mb-3">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => setQuantity(prev => prev + 1)}
            >
              +
            </button>
          </div>
        )}
        
        <button 
          className="btn btn-primary" 
          disabled={loading}
          onClick={handleAddToCart}
        >
          {loading ? (
            <Skeleton width={80} />
          ) : isInCart(id) ? (
            `Agregar más (${getItemQuantity(id)} en carrito)`
          ) : (
            'Agregar a la cesta'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;












