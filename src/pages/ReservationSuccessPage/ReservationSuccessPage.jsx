import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './ReservationSuccessPage.module.css';

const ReservationSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reservation = state?.reservation;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.checkmark}>✓</div>
          <h1>¡Reserva Exitosa!</h1>
          <p className={styles.subtitle}>Tu reserva ha sido confirmada</p>
        </div>

        {reservation && (
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span>Número de Reserva:</span>
              <strong>#{reservation.reservationId}</strong>
            </div>
            
            <div className={styles.detailItem}>
              <span>Periodo de alquiler:</span>
              <strong>
                {new Date(reservation.startDate).toLocaleDateString()} - 
                {new Date(reservation.endDate).toLocaleDateString()}
              </strong>
            </div>

            <div className={styles.detailItem}>
              <span>Total:</span>
              <strong>${reservation.totalPrice.toFixed(2)}</strong>
            </div>

            <div className={styles.itemsSection}>
              <h3>Artículos reservados:</h3>
              <div className={styles.itemsGrid}>
                {reservation.items.map((item, index) => (
                  <div key={index} className={styles.itemCard}>
                    <h4>{item.clotheName}</h4>
                    <div className={styles.itemDetails}>
                      <span>Precio/día: ${item.price.toFixed(2)}</span>
                      <span>Días: {item.rentalDays}</span>
                      <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button 
            onClick={() => navigate('/')}
            className={styles.continueShopping}
          >
            Seguir comprando
          </button>
          <button 
            onClick={() => navigate('/my-reservations')}
            className={styles.viewReservations}
          >
            Ver mis reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;