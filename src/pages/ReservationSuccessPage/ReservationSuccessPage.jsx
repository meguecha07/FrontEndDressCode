import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ReservationSuccessPage.module.css';

const ReservationSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reservation = state?.reservation;

  // Función para formatear fechas de manera segura
  const formatSafeDate = (dateString) => {
    try {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return 'Fecha inválida';
    }
  };

  // Validación de la estructura de la reserva actualizada
  const isValidReservation = reservation && 
    typeof reservation === 'object' &&
    Array.isArray(reservation.items) &&
    reservation.items.length > 0 &&
    reservation.items.every(item => 
      typeof item.clotheId === 'number' &&
      typeof item.startDate === 'string' &&
      typeof item.endDate === 'string'
    );

  // Función para calcular días de diferencia
  const calculateDays = (start, end) => {
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch {
      return 0;
    }
  };

  // Calcular el precio total basado en los items
  const calculateTotal = () => {
    if (!isValidReservation) return 0;
    return reservation.items.reduce((sum, item) => {
      const days = calculateDays(item.startDate, item.endDate);
      return sum + (item.price * days);
    }, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.checkmark} role="img" aria-label="Reserva exitosa">✓</div>
          <h1>¡Reserva Exitosa!</h1>
          <p className={styles.subtitle}>Tu reserva ha sido confirmada</p>
        </div>

        {isValidReservation ? (
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span>Fecha de creación:</span>
              <strong>{new Date().toLocaleDateString('es-ES')}</strong>
            </div>

            <div className={styles.itemsSection}>
              <h3>Artículos reservados:</h3>
              <div className={styles.itemsGrid}>
                {reservation.items.map((item, index) => (
                  <div key={index} className={styles.itemCard}>
                    <h4>{item.name || `Producto ${item.clotheId}`}</h4>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemDetailRow}>
                        <span>Fechas:</span>
                        <span>
                          {formatSafeDate(item.startDate)} - {formatSafeDate(item.endDate)}
                          <span className={styles.daysCount}>
                            ({calculateDays(item.startDate, item.endDate)} días)
                          </span>
                        </span>
                      </div>
                      <div className={styles.itemDetailRow}>
                        <span>Precio/día:</span>
                        <span>${(item.price || 0).toFixed(2)}</span>
                      </div>
                      <div className={styles.itemDetailRow}>
                        <span>Subtotal:</span>
                        <span>
                          ${(item.price * calculateDays(item.startDate, item.endDate)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span>Total:</span>
                <strong>${calculateTotal().toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.errorMessage}>
            <p>No se pudieron cargar los detalles completos de la reserva</p>
            <p>Por favor verifica tu correo electrónico para más información</p>
          </div>
        )}

        <div className={styles.actions}>
          <button 
            onClick={() => navigate('/')}
            className={styles.continueShopping}
            aria-label="Volver a la tienda"
          >
            <i className="fas fa-arrow-left"></i> Seguir comprando
          </button>
          
          <button 
            onClick={() => navigate('/my-reservations')}
            className={styles.viewReservations}
            aria-label="Ver mis reservas"
          >
            <i className="fas fa-calendar-alt"></i> Ver mis reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;