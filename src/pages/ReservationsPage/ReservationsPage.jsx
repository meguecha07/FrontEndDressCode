import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getReservations } from '../../services/api';
import styles from './ReservationsPage.module.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const ReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const allReservations = await getReservations();
        const userReservations = allReservations.filter(
          r => r.userId === user?.id
        );
        setReservations(userReservations);
        setError(null);
      } catch (err) {
        setError('Error cargando reservas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadReservations();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pendiente': return '#6c5ce7';
      case 'en curso': return '#2d98da';
      case 'completado': return '#20bf6b';
      case 'devuelto': return '#a5b1c2';
      default: return '#d1d8e0';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mis Reservas</h1>
        <button 
          onClick={() => navigate('/')}
          className={styles.backButton}
        >
          Volver al inicio
        </button>
      </div>

      {reservations.length === 0 ? (
        <div className={styles.empty}>
          <i className="fa-regular fa-calendar-xmark"></i>
          <p>No tienes reservas activas</p>
        </div>
      ) : (
        <div className={styles.reservationsGrid}>
          {reservations.map(reservation => (
            <div key={reservation.reservationId} className={styles.reservationCard}>
              <div className={styles.reservationHeader}>
                <div>
                  <h3>Reserva #{reservation.reservationId}</h3>
                  <span className={styles.dates}>
                    {new Date(reservation.startDate).toLocaleDateString()} - 
                    {new Date(reservation.endDate).toLocaleDateString()}
                  </span>
                </div>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(reservation.status) }}
                >
                  {reservation.status}
                </span>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>Total:</span>
                  <strong>${reservation.totalPrice.toFixed(2)}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Artículos:</span>
                  <span>{reservation.items.length}</span>
                </div>
              </div>

              <div className={styles.itemsList}>
                {reservation.items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <span>{item.clotheName}</span>
                    <div className={styles.itemDetails}>
                      <span>${item.price.toFixed(2)}/día</span>
                      <span>{item.rentalDays} días</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;