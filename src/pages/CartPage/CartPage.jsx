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

  // Función para formatear la fecha en formato YYYY-MM-DD
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES');  // Cambia 'es-ES' si prefieres otro formato
  };

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

  // Calcular subtotal y total
  const getCartSubtotals = () => {
    return cartItems.map(item => {
      const days = getDaysBetween(item.startDate, item.endDate);
      return item.price * days;
    });
  };

  const dailySubtotals = getCartSubtotals();
  const total = dailySubtotals.reduce((sum, subtotal) => sum + subtotal, 0);

  useEffect(() => {
    const loadCartItems = () => {
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(items);

      // Si hay productos en el carrito, establecer las fechas de inicio y fin
      if (items.length > 0) {
        const firstItem = items[0];
        setDates({
          startDate: firstItem.startDate,
          endDate: firstItem.endDate
        });
      }
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
        date: new Date().toISOString().split('T')[0],  // Fecha actual de la reserva
        items: cartItems.map(item => {
          const days = getDaysBetween(item.startDate, item.endDate);
          // Asegúrate de que las fechas no sean null
          if (!item.startDate || !item.endDate) {
            throw new Error('Las fechas de inicio y fin deben ser válidas');
          }
          return {
            clotheId: item.clotheId,
            startDate: item.startDate,  // Verifica que esta fecha no sea null
            endDate: item.endDate,      // Verifica que esta fecha no sea null
            price: item.price,
            rentalDays: days,
            subtotal: item.price * days
          };
        }),
        totalPrice: total,
        surcharge: 0,  // Si tienes cargos adicionales, los puedes calcular aquí
        refund: 0,     // Si hay reembolsos, los puedes calcular aquí
        status: "PENDIENTE",  // El estado de la reserva
        isPaid: false
      };

      // Llamar a la API para crear la reserva
      await createReservation(reservationData);
      
      // Limpiar el carrito y redirigir al usuario
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

  // Obtener la fecha actual (hoy)
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
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
            {cartItems.map((item, index) => {
              const days = getDaysBetween(item.startDate, item.endDate);
              const subtotal = item.price * days;
              return (
                <div key={index} className={styles.itemCard}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p><strong>Descripción:</strong> {item.description}</p>
                    <div className={styles.itemInfo}>
                      <p><i className="fa-solid fa-ruler"></i> Talla: {item.size}</p>
                      <p><i className="fa-solid fa-tag"></i> Precio diario: ${item.price.toFixed(2)}</p>
                      <p><strong>Fecha de inicio:</strong> {formatDate(item.startDate)}</p> 
                      <p><strong>Fecha de fin:</strong> {formatDate(item.endDate)}</p> 
                      <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
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
              );
            })}
          </div>

          <div className={styles.summary}>
            <div className={styles.userInfo}>
              <h3>Detalles del usuario</h3>
              <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className={styles.dateInfo}>
              <p><strong>Fecha de reserva:</strong> {getCurrentDate()}</p> 
            </div>

            <div className={styles.totalContainer}>
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