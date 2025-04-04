import React, { useState } from "react";
import PropTypes from "prop-types";
import StarRating from "../StarRating/StarRating";
import styles from "./ModalAddReview.module.css";
import { createReview } from "../../../../services/api";
import { useAuth } from "../../../../context/AuthContext"

const ModalAddReview = ({ productId, onClose, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    try {
      const newReview = {
        userId: user.id,
        clothe_id: productId,
        comment: comment,
        rating: rating,
      };
      const createdReview = await createReview(newReview);
      onReviewSubmitted(createdReview);
      onClose();
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
            <h2>Agregar Reseña</h2>
            <button className={styles.closeButton} onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>
        <div className={styles.modalContent}>
            <p>Califica la prenda del 0 al 5</p>
            <StarRating rating={rating} setRating={setRating} />
            <textarea
                className={styles.textarea}
                placeholder="Escribe tu reseña aquí..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={handleSubmit} className={styles.submitButton}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalAddReview.propTypes = {
  productId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onReviewSubmitted: PropTypes.func.isRequired,
};

export default ModalAddReview;