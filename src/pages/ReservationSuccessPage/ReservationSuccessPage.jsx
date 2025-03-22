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

  // Validación completa de la estructura de la reserva
  const isValidReservation = reservation && 
    typeof reservation === 'object' &&
    Number.isInteger(reservation.reservationId) &&
    typeof reservation.startDate === 'string' &&
    typeof reservation.endDate === 'string' &&
    Array.isArray(reservation.items) &&
    reservation.items.length > 0;

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
              <span>Número de Reserva:</span>
              <strong data-testid="reservation-id">#{reservation.reservationId}</strong>
            </div>
            
            <div className={styles.detailItem}>
              <span>Periodo de alquiler:</span>
              <strong>
                {formatSafeDate(reservation.startDate)} - {formatSafeDate(reservation.endDate)}
                <span className={styles.daysCount}>
                  ({calculateDays(reservation.startDate, reservation.endDate)} días)
                </span>
              </strong>
            </div>

            <div className={styles.detailItem}>
              <span>Total:</span>
              <strong>
                ${(reservation.totalPrice?.toFixed(2) || '0.00').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </strong>
            </div>

            <div className={styles.itemsSection}>
              <h3>Artículos reservados:</h3>
              <div className={styles.itemsGrid}>
                {reservation.items.map((item, index) => (
                  <div key={index} className={styles.itemCard}>
                    <h4>{item.clotheName || 'Producto sin nombre'}</h4>
                    <div className={styles.itemDetails}>
                      <div>
                        <span>Precio/día:</span>
                        <span>${(item.price || 0).toFixed(2)}</span>
                      </div>
                      <div>
                        <span>Días:</span>
                        <span>{item.rentalDays || calculateDays(reservation.startDate, reservation.endDate)}</span>
                      </div>
                      <div>
                        <span>Subtotal:</span>
                        <span>${(item.subtotal || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.errorMessage}>
{/*             <p>No se pudieron cargar los detalles de la reserva</p>
            <p>Por favor verifica tu correo electrónico o contacta al soporte</p>
            <button 
              onClick={() => navigate('/contact')}
              className={styles.contactButton}
              aria-label="Contactar al soporte"
            >
              <i className="fas fa-life-ring"></i> Soporte técnico
            </button> */}
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
          
          {isValidReservation && (
            <button 
              onClick={() => navigate(`/reservations/${reservation.reservationId}`)}
              className={styles.viewDetails}
              aria-label="Ver detalles completos"
            >
              <i className="fas fa-file-invoice"></i> Ver detalles completos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;