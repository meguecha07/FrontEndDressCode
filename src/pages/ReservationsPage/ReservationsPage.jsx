import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getReservationsById } from "../../services/api";

import styles from "./ReservationsPage.module.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const filterReservationsByStatus = (status) => {
    console.log("inside filter");
    const filteredArray = reservations.filter(
      (reservation) => reservation.status === status
    );
    console.log("filteredArray", filteredArray);
    setFilteredReservations(filteredArray);
  };

  const handleFilter = (status) => {
    console.log("inside handle filter");
    filterReservationsByStatus(status);
  };

  const showAllReservations = () => {
    setFilteredReservations(reservations);
  };

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const allReservations = await getReservationsById(user.id);
        console.log("allReservations", allReservations);
        const userReservations = allReservations.filter(
          (r) => r.userId === user?.id
        );
        console.log("useReservations", userReservations);
        setReservations(allReservations); // Store all reservations
        setFilteredReservations(allReservations); // Initially show all reservations
        setError(null);
      } catch (err) {
        setError("Error cargando reservas");
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
      case "pendiente":
        return "#6c5ce7";
      case "en curso":
        return "#2d98da";
      case "completado":
        return "#20bf6b";
      case "devuelto":
        return "#a5b1c2";
      default:
        return "#d1d8e0";
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mis Reservas</h1>
        <button
          className={styles.backButton}
          onClick={() => navigate("/")}
          aria-label="Volver al inicio"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div className={styles.filtersContainer}>
        <button onClick={showAllReservations} className={styles.allButton}>
          Todos
        </button>
        <button
          onClick={() => handleFilter("PENDIENTE")}
          className={styles.pendingButton}
        >
          Pendientes
        </button>
        <button
          onClick={() => handleFilter("COMPLETADO")}
          className={styles.completedButton}
        >
          Completados
        </button>
        <button
          onClick={() => handleFilter("CONFIRMADO")}
          className={styles.inCourseButton}
        >
          En curso
        </button>
        <button
          onClick={() => handleFilter("INCOMPLETO")}
          className={styles.incompletedButton}
        >
          Incompleto
        </button>
        <button
          onClick={() => handleFilter("CANCELADO")}
          className={styles.canceledButton}
        >
          Cancelado
        </button>
      </div>

      {filteredReservations.length === 0 ? (
        <div className={styles.empty}>
          <i className="fa-regular fa-calendar-xmark"></i>
          <p>No tienes reservas activas</p>
        </div>
      ) : (
        <div className={styles.reservationsGrid}>
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.reservationId}
              className={styles.reservationCard}
            >
              <div className={styles.reservationHeader}>
                <div>
                  <h3>Reserva #{reservation.reservationId}</h3>
                  <span className={styles.dates}>
                    {new Date(reservation.date).toLocaleDateString()}
                  </span>
                </div>
                <span
                  className={styles.status}
                  style={{
                    backgroundColor: getStatusColor(reservation.status),
                  }}
                >
                  {reservation.status}
                </span>
              </div>
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>Recargo:</span>
                  <strong>${reservation.surcharge.toFixed(2)}</strong>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span>Reembolso:</span>
                  <strong>${reservation.refund.toFixed(2)}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Pagado:</span>
                  {console.log("paid", reservation.paid)}
                  <span>{reservation.paid === false ? "No" : "Si"}</span>
                </div>
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
                {reservation.items.map((item) => (
                  <div key={item.idReservationItem} className={styles.itemInfo}>
                    <div className={styles.itemHeader}>
                      <h4>Item #{item.idReservationItem}</h4>
                      <span>Producto: {item.clotheName}</span>
                    </div>

                    <div className={styles.itemDetails}>
                      <div className={styles.detailItem}>
                        <span>Inicio de renta:</span>
                        <strong>
                          {new Date(item.startDate).toLocaleDateString()}
                        </strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Fin de renta:</span>
                        <strong>
                          {new Date(item.endDate).toLocaleDateString()}
                        </strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Fecha de entrega:</span>
                        <strong>
                          {item.returnDate
                            ? new Date(item.returnDate).toLocaleDateString()
                            : "No ha sido devuelto"}
                        </strong>
                      </div>
                    </div>

                    <div className={styles.itemPricing}>
                      <div className={styles.detailItem}>
                        <span>Precio por dia:</span>
                        <strong>${item.price.toFixed(2)}</strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Dias de renta:</span>
                        <strong>{item.rentalDays}</strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>SubTotal:</span>
                        <strong>${item.subTotal.toFixed(2)}</strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Descuento:</span>
                        <strong>${item.discount.toFixed(2)}</strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Recargo:</span>
                        <strong>${item.surcharge.toFixed(2)}</strong>
                      </div>
                      <div className={styles.detailItem}>
                        <span>Estado:</span>
                        <strong>{item.itemReservationStatus}</strong>
                      </div>
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
