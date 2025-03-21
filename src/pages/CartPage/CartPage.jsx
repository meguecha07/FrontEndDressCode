import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createReservation } from '../../services/api';
import Notification from '../../components/Notification/Notification';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    button: null
  });
  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  // Calcular días de alquiler
  const getDaysBetween = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);
    const diff = end - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = getDaysBetween(dates.startDate, dates.endDate);
  const dailySubtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = dailySubtotal * days;

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
    
    setNotification({
      show: true,
      message: `${removedItem.name} eliminado del carrito`,
      button: {
        label: 'Deshacer',
        action: () => {
          const restoredItems = [...newItems];
          restoredItems.splice(index, 0, removedItem);
          localStorage.setItem('cartItems', JSON.stringify(restoredItems));
          setCartItems(restoredItems);
        }
      }
    });
  };

  const handleFinalizeReservation = async () => {
    if (!user) {
      setNotification({
        show: true,
        message: 'Debes iniciar sesión para reservar',
        button: {
          label: 'Iniciar sesión',
          action: () => navigate('/login')
        }
      });
      return;
    }

    if (!dates.startDate || !dates.endDate) return;

    try {
      const reservationData = {
        userId: user.id,
        startDate: dates.startDate,
        endDate: dates.endDate,
        status: "PENDIENTE",
        isPaid: false,
        items: cartItems.map(item => ({
          clotheId: item.clotheId,
          price: item.price,
          rentalDays: days,
          subtotal: item.price * days
        }))
      };

      await createReservation(reservationData);
      localStorage.removeItem('cartItems');
      navigate('/reservation-success', { state: { reservation: reservationData } });
    } catch (error) {
      console.error('Error creando reserva:', error);
      setNotification({
        show: true,
        message: 'Error al crear la reserva. Intenta nuevamente.',
        button: null
      });
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'startDate' && dates.endDate < value) {
      setDates(prev => ({ ...prev, endDate: value }));
    }
  };

  return (
    <div className={styles.container}>
      {notification.show && (
        <Notification 
          message={notification.message}
          buttonLabel={notification.button?.label}
          buttonAction={notification.button?.action}
          onClose={() => setNotification({ show: false, message: '', button: null })}
        />
      )}
      
      <h1 className={styles.title}>
        <i className="fa-solid fa-cart-shopping"></i> Carrito de Reservas
      </h1>
      
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <i className="fa-regular fa-face-sad-tear"></i>
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
                    <p><i className="fa-solid fa-ruler"></i> Talla: {item.size}</p>
                    <p><i className="fa-solid fa-tag"></i> Precio diario: ${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(index)}
                    className={styles.removeButton}
                    aria-label="Eliminar del carrito"
                  >
                    <i className="fa-solid fa-trash-can"></i> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.datePicker}>
              <div className={styles.dateGroup}>
                <label>
                  <i className="fa-solid fa-calendar-start"></i> Fecha de inicio:
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={dates.startDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className={styles.dateGroup}>
                <label>
                  <i className="fa-solid fa-calendar-end"></i> Fecha de fin:
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={dates.endDate}
                  onChange={handleDateChange}
                  min={dates.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className={styles.totalContainer}>
  <div className={styles.totalRow}>
    <span>Subtotal diario:</span>
    <span>${dailySubtotal.toFixed(2)}</span>
  </div>
  <div className={styles.totalRow}>
    <span>Días de alquiler:</span>
    <span>{days} día{days !== 1 && 's'}</span>
  </div>
  <div className={styles.totalRow}>
    <div className={styles.totalLabel}>
      <i className="fa-solid fa-receipt"></i>
      <span>Total:</span>
    </div>
    <h2 className={styles.totalPrice}>${total.toFixed(2)}</h2>
  </div>
</div>

            <button 
              onClick={handleFinalizeReservation}
              className={styles.reserveButton}
              disabled={!user || cartItems.length === 0 || !dates.startDate || !dates.endDate}
              title={!user ? "Inicia sesión para reservar" : ""}
            >
              {user ? (
                <>
                  <i className="fa-solid fa-lock"></i> Finalizar Reserva
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i> Iniciar sesión
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;