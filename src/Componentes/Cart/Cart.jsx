import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../Utils/utils';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const order = {
        items: cartItems.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.quantity,
          subtotal: item.precio * item.quantity
        })),
        total: getCartTotal(),
        fecha: new Date().toISOString(),
        estado: 'generada'
      };

      const docRef = await addDoc(collection(db, 'ordenes'), order);
      
      setOrderDetails({
        ...order,
        orderId: docRef.id
      });
      
      clearCart();
      
      setOrderSuccess(true);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar tu orden. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess && orderDetails) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <i className="fas fa-check-circle text-success" style={{ fontSize: '48px' }}></i>
              <h2 className="mt-3">¡Gracias por tu compra!</h2>
              <p className="text-muted">Tu orden ha sido procesada exitosamente</p>
            </div>
            
            <div className="border-bottom pb-3 mb-3">
              <h4 className="mb-3">Detalles de la orden</h4>
              <p className="mb-1">Número de orden: <strong>{orderDetails.orderId}</strong></p>
              <p className="mb-1">Fecha: {new Date(orderDetails.fecha).toLocaleString()}</p>
            </div>
            
            <div className="mb-4">
              <h5 className="mb-3">Productos</h5>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span>{item.nombre} x {item.cantidad}</span>
                  <span>{formatCurrency(item.subtotal)} CLP</span>
                </div>
              ))}
              
              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>{formatCurrency(orderDetails.total)} CLP</strong>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <div className="card">
          <div className="card-body p-4">
            <h2 className="h4 mb-4">Tu carrito está vacío</h2>
            <p className="text-muted mb-4">¡Agrega algunos productos para comenzar!</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Ir a comprar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tu Carrito</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <img 
                    src={item.imagen || '/api/placeholder/100/100'} 
                    alt={item.nombre}
                    className="rounded"
                    style={{ width: '96px', height: '96px', objectFit: 'cover' }}
                  />
                  <div className="ms-4 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="h5 mb-1">{item.nombre}</h3>
                        <p className="text-muted">{formatCurrency(item.precio)} CLP</p>
                      </div>
                      <button 
                        className="btn btn-link text-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="mt-3 d-flex align-items-center">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <span className="ms-auto fw-semibold">
                        {formatCurrency(item.precio * item.quantity)} CLP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button 
            className="btn btn-outline-danger mt-3"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body p-4">
              <h3 className="h5 mb-4">Resumen de compra</h3>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>{formatCurrency(getCartTotal())} CLP</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <hr className="my-3" />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-semibold">Total:</span>
                <span className="fw-semibold">{formatCurrency(getCartTotal())} CLP</span>
              </div>
              <button 
                className="btn btn-primary w-100"
                onClick={handleCreateOrder}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Proceder al pago'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
