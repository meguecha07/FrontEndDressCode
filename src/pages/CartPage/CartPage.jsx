import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createReservation } from '../../services/api';
import Notification from '../../components/Notification/Notification';
import DoubleCalendar from '../../components/DoubleCalendar/DoubleCalendar';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    button: null
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempDates, setTempDates] = useState({ start: null, end: null });
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);
    const diff = end - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  };

  const calculateTotals = () => {
    return cartItems.reduce((acc, item) => {
      const days = calculateDays(item.startDate, item.endDate);
      const subtotal = item.price * days;
      return {
        totalDays: Math.max(acc.totalDays, days),
        dailySubtotal: acc.dailySubtotal + item.price,
        total: acc.total + subtotal
      };
    }, { totalDays: 0, dailySubtotal: 0, total: 0 });
  };

  const { totalDays, dailySubtotal, total } = calculateTotals();

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

  useEffect(() => {
    setReservations([]);
  }, []);

  const handleEditDates = (index) => {
    setEditingIndex(index);
    const item = cartItems[index];
    setTempDates({
      start: item.startDate ? new Date(item.startDate + 'T00:00:00') : null,
      end: item.endDate ? new Date(item.endDate + 'T00:00:00') : null
    });
  };

  const handleSaveDates = (index) => {
    if (!tempDates.start || !tempDates.end) return;

    let start = new Date(tempDates.start);
    let end = new Date(tempDates.end);

    if (start > end) {
      [start, end] = [end, start];
    }

    const updatedItems = [...cartItems];
    updatedItems[index] = {
      ...updatedItems[index],
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setTempDates({ start: null, end: null });
  };

  const handleDatesChange = (start, end) => {
    if (start && end && start > end) {
      setTempDates({ start: end, end: start });
    } else {
      setTempDates({ start, end });
    }
  };

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

    try {
      const reservationData = {
        userId: user.id,
        items: cartItems.map(item => ({
          clotheId: item.clotheId,
          startDate: item.startDate,
          endDate: item.endDate
        }))
      };

      const createdReservation = await createReservation(reservationData); 
      localStorage.removeItem('cartItems');
      navigate('/reservation-success', { 
        state: { 
          reservation: {
            ...createdReservation,
            items: cartItems.map(item => ({
              ...item,
              name: item.name,
              price: item.price
            }))
          } 
        } 
      });
    } catch (error) {
      console.error('Error creando reserva:', error);
      setNotification({
        show: true,
        message: 'Error al crear la reserva. Intenta nuevamente.',
        button: null
      });
    }
  };

  const allItemsHaveDates = cartItems.every(item => 
    item.startDate && item.endDate
  );

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
          <button 
            onClick={() => navigate('/')}
            className={styles.shopButton}
          >
            <i className="fa-solid fa-arrow-left"></i> Continuar comprando
          </button>
        </div>
      ) : (
        <div className={styles.cartLayout}>
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
                  <div className={styles.itemHeader}>
                    <h3>{item.name}</h3>
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className={styles.removeButton}
                      aria-label="Eliminar del carrito"
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                  
                  <div className={styles.itemInfo}>
                    <div className={styles.infoRow}>
                      <p><i className="fa-solid fa-ruler"></i> Talla: {item.size}</p>
                      <p><i className="fa-solid fa-tag"></i> ${item.price.toFixed(2)}/día</p>
                    </div>
                    
                    <div className={styles.dateSection}>
                      {editingIndex === index ? (
                        <div className={styles.dateEditor}>
                          <DoubleCalendar
                            reservations={reservations}
                            productId={item.clotheId}
                            onDatesChange={handleDatesChange}
                            initialStartDate={tempDates.start}
                            initialEndDate={tempDates.end}
                          />
                          <div className={styles.editButtons}>
                            <button 
                              onClick={() => handleSaveDates(index)}
                              className={styles.saveButton}
                              disabled={!tempDates.start || !tempDates.end}
                            >
                              <i className="fa-solid fa-check"></i> Guardar
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className={styles.cancelButton}
                            >
                              <i className="fa-solid fa-xmark"></i> Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.dateDisplay}>
                          <div>
                            <p className={styles.dateLabel}>
                              <i className="fa-solid fa-calendar-days"></i> Fechas
                            </p>
                            <p className={styles.dateValue}>
  {item.startDate && item.endDate ? (
    `${new Date(item.startDate + 'T00:00:00').toLocaleDateString('es-ES')} - ${new Date(item.endDate + 'T00:00:00').toLocaleDateString('es-ES')}`
  ) : (
    'No seleccionadas'
  )}
</p>
                          </div>
                          <button
                            onClick={() => handleEditDates(index)}
                            className={styles.editButton}
                            aria-label="Editar fechas"
                          >
                            <i className="fa-solid fa-pen"></i> Editar
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {item.startDate && item.endDate && (
                      <div className={styles.subtotalRow}>
                        <p className={styles.daysInfo}>
                          <i className="fa-solid fa-clock"></i> {calculateDays(item.startDate, item.endDate)} días
                        </p>
                        <p className={styles.subtotalInfo}>
                          ${(item.price * calculateDays(item.startDate, item.endDate)).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumen</h2>
            <div className={styles.totalContainer}>
              <div className={styles.totalRow}>
                <span>Subtotal diario:</span>
                <span>${dailySubtotal.toFixed(2)}</span>
              </div>
              {totalDays > 0 && (
                <div className={styles.totalRow}>
                  <span>Días de alquiler:</span>
                  <span>{totalDays}</span>
                </div>
              )}
              <div className={styles.divider}></div>
              <div className={styles.totalRow}>
                <div className={styles.totalLabel}>
                  <span>Total</span>
                </div>
                <h2 className={styles.totalPrice}>${total.toFixed(2)}</h2>
              </div>
            </div>

            <button 
              onClick={handleFinalizeReservation}
              className={styles.reserveButton}
              disabled={!user || cartItems.length === 0 || !allItemsHaveDates}
              title={!user ? "Inicia sesión para reservar" : !allItemsHaveDates ? "Todos los items deben tener fechas seleccionadas" : ""}
            >
              {user ? (
                <>
                  <i className="fa-solid fa-check-circle"></i> Finalizar Reserva
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i> Iniciar sesión
                </>
              )}
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className={styles.continueShoppingButton}
            >
              <i className="fa-solid fa-arrow-left"></i> Seguir comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;