// components/admin/ui/ReservationFormModal/ReservationFormModal.jsx
import { useState, useEffect } from 'react';
import styles from './ReservationFormModal.module.css';

const ReservationFormModal = ({ initialData, onSave, onClose }) => {
  const [reservation, setReservation] = useState({
    startDate: '',
    endDate: '',
    status: 'PENDIENTE',
    paid: false,
    items: []
  });

  useEffect(() => {
    if (initialData) {
      setReservation({
        startDate: initialData.startDate.split('T')[0],
        endDate: initialData.endDate.split('T')[0],
        status: initialData.status,
        paid: initialData.paid,
        items: initialData.items.map(item => ({ clotheId: item.clotheId }))
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReservation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...reservation,
      startDate: `${reservation.startDate}T00:00:00`,
      endDate: `${reservation.endDate}T00:00:00`
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className={styles.scrollContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>
                <span>Fecha de Inicio</span>
                <input
                  type="date"
                  name="startDate"
                  value={reservation.startDate}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span>Fecha de Fin</span>
                <input
                  type="date"
                  name="endDate"
                  value={reservation.endDate}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  min={reservation.startDate}
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span>Estado</span>
                <select
                  name="status"
                  value={reservation.status}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="CONFIRMADO">Confirmado</option>
                  <option value="COMPLETADO">Completado</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="paid"
                  checked={reservation.paid}
                  onChange={handleChange}
                  className={styles.checkboxInput}
                />
                <span>Pagado</span>
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                {initialData ? 'Guardar Cambios' : 'Crear Reserva'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationFormModal;