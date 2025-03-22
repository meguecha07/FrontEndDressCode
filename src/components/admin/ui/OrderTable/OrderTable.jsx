// components/admin/ui/OrderTable/OrderTable.jsx
import { useState, useEffect } from 'react';
import { getReservations, updateReservation, deleteReservation, returnReservation } from '../../../../services/api';
import ReservationFormModal from '../ReservationFormModal/ReservationFormModal';
import styles from './OrderTable.module.css';

const OrderTable = () => {
  const [reservations, setReservations] = useState([]);
  const [expandedReservation, setExpandedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const fetchedReservations = await getReservations();
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  const handleRowClick = reservationId => (e) => {
    if (!e.target.closest('button')) {
      setExpandedReservation(expandedReservation === reservationId ? null : reservationId);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDIENTE': return '#6c5ce7';
      case 'CONFIRMADO': return '#2d98da';
      case 'COMPLETADO': return '#20bf6b';
      case 'CANCELADO': return '#ff4757';
      case 'DEVUELTO': return '#a5b1c2';
      default: return '#d1d8e0';
    }
  };

  const handleDelete = async (reservationId) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar esta reserva?');
    if (!confirmDelete) return;
    
    try {
      await deleteReservation(reservationId);
      loadReservations();
    } catch (error) {
      console.error("Error eliminando reserva:", error);
    }
  };

  const handleReturn = async (reservationId) => {
    try {
      await returnReservation(reservationId);
      loadReservations();
    } catch (error) {
      console.error("Error devolviendo reserva:", error);
    }
  };

  const handleSave = async (reservationData) => {
    try {
      if (currentReservation) {
        await updateReservation(currentReservation.reservationId, reservationData);
      }
      loadReservations();
      setShowModal(false);
    } catch (error) {
      console.error("Error guardando reserva:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Reservas</h2>
        <button 
          className={styles.newOrderButton}
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus"></i>
          Nueva Reserva
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fechas</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <>
                <tr 
                  key={reservation.reservationId} 
                  className={styles.mainRow}
                  onClick={handleRowClick(reservation.reservationId)}
                >
                  <td data-label="ID">#{reservation.reservationId}</td>
                  <td data-label="Usuario">Usuario #{reservation.userId}</td>
                  <td data-label="Fechas">
                    <div className={styles.dateGroup}>
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(reservation.startDate).toLocaleDateString()} - 
                      {new Date(reservation.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td data-label="Items">{reservation.items.length} artículos</td>
                  <td data-label="Total">${reservation.totalPrice.toFixed(2)}</td>
                  <td data-label="Estado">
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(reservation.status) }}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td data-label="Acciones" className={styles.actions}>
                    <button 
                      className={styles.actionButton}
                      onClick={() => {
                        setCurrentReservation(reservation);
                        setShowModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className={`${styles.actionButton} ${styles.delete}`}
                      onClick={() => handleDelete(reservation.reservationId)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    {reservation.status === 'COMPLETADO' && (
                      <button
                        className={`${styles.actionButton} ${styles.return}`}
                        onClick={() => handleReturn(reservation.reservationId)}
                        title="Marcar como devuelto"
                      >
                        <i className="fas fa-undo"></i>
                      </button>
                    )}
                  </td>
                </tr>

                {expandedReservation === reservation.reservationId && (
                  <tr className={styles.detailsRow}>
                    <td colSpan="7">
                      <div className={styles.orderDetails}>
                        <div className={styles.detailSection}>
                          <h4><i className="fas fa-info-circle"></i> Detalles de la Reserva</h4>
                          <p>Pagado: {reservation.paid ? 'Sí' : 'No'}</p>
                          <p>Días de alquiler: {reservation.items[0]?.rentalDays}</p>
                        </div>
                        
                        <div className={styles.detailSection}>
                          <h4><i className="fas fa-tshirt"></i> Artículos ({reservation.items.length})</h4>
                          <div className={styles.itemsGrid}>
                            {reservation.items.map((item, index) => (
                              <div key={index} className={styles.itemCard}>
                                <div className={styles.itemHeader}>
                                  <span className={styles.itemName}>{item.clotheName}</span>
                                  <span className={styles.itemPrice}>${item.price}/día</span>
                                </div>
                                <div className={styles.itemDetails}>
                                  <span>Subtotal: ${item.subtotal.toFixed(2)}</span>
                                  <span>Días: {item.rentalDays}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ReservationFormModal
          initialData={currentReservation}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setCurrentReservation(null);
          }}
        />
      )}
    </div>
  );
};

export default OrderTable;