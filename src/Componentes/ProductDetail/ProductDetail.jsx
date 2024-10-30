import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productDetail.css';
import { formatCurrency } from '../../Utils/utils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id, products]);

  if (!product && !loading) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="container-detail">
      <div className="box-img">
        {loading ? (
          <Skeleton height={300} width={300} style={{ borderRadius: '0.5rem' }} />
        ) : (
          <img src={product.imagen} alt={product.nombre} className="img-fluid" />
        )}
      </div>
      <div className="box-info">
        <h5>{loading ? <Skeleton width={100} /> : product.categoria}</h5>
        <h2>{loading ? <Skeleton width={200} /> : product.nombre}</h2>
        <p>{loading ? <Skeleton count={3} /> : product.descripcioncorta}</p>
        <h4>{loading ? <Skeleton width={100} /> : `${formatCurrency(product.precio)} CLP`}</h4>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? <Skeleton width={80} /> : 'Agregar a la cesta'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;





