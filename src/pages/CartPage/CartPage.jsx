import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createReservation } from '../../services/api';
import Notification from '../../components/Notification/Notification';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = () => {
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(items);
    };
    
    loadCartItems();
    window.addEventListener('storage', loadCartItems);
    
    return () => {
      window.removeEventListener('storage', loadCartItems);
    };
  }, []);

  const handleRemoveItem = (index) => {
    const removedItem = cartItems[index];
    const newItems = cartItems.filter((_, i) => i !== index);
    
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    setCartItems(newItems);
    
    setNotificationMessage(`${removedItem.name} eliminado del carrito`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleFinalizeReservation = async () => {
    if (!user) {
      setNotificationMessage('Debes iniciar sesión para reservar');
      setShowNotification(true);
      return;
    }

    try {
      const reservationData = {
        userId: user.id,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 604800000).toISOString().split('T')[0],
        status: "PENDIENTE",
        isPaid: false,
        items: cartItems.map(item => ({ clotheId: item.clotheId }))
      };

      await createReservation(reservationData);
      localStorage.removeItem('cartItems');
      navigate('/reservation-success');
    } catch (error) {
      console.error('Error creating reservation:', error);
      setNotificationMessage('Error al crear la reserva');
      setShowNotification(true);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.container}>
      {showNotification && (
        <Notification 
          message={notificationMessage} 
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <h1 className={styles.title}>Carrito de Reservas</h1>
      
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <i className="fa-solid fa-cart-shopping"></i>
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className={styles.itemsContainer}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className={styles.itemImage}
                  onClick={() => navigate(`/product/${item.clotheId}`)}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <div className={styles.itemInfo}>
                    <p>Talla: {item.size}</p>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(index)}
                    className={styles.removeButton}
                  >
                    Eliminar
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.totalContainer}>
              <h2>Total:</h2>
              <h2 className={styles.totalPrice}>${total.toFixed(2)}</h2>
            </div>
            <button 
              onClick={handleFinalizeReservation}
              className={styles.reserveButton}
              disabled={!user || cartItems.length === 0}
              title={!user ? "Inicia sesión para reservar" : ""}
            >
              {user ? 'Finalizar Reserva' : 'Inicia sesión para reservar'}
              <i className="fa-solid fa-credit-card"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;