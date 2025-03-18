import { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, images, onSelectImage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9; // 3 columnas x 3 filas
  const totalPages = Math.ceil(images.length / imagesPerPage);

  if (!isOpen) return null;

  const startIndex = (currentPage - 1) * imagesPerPage;
  const visibleImages = images.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>

        {/* Grid de imágenes */}
        <div className={styles.imageGrid}>
          {visibleImages.map((image, index) => (
            <img
              key={index}
              src={image} // Aquí usamos directamente la URL
              alt={`Imagen ${index + 1}`}
              className={styles.modalImage}
              onClick={() => {
                onSelectImage(image);
                onClose();
              }}
            />
          ))}
        </div>

        {/* Controles de paginación */}
        <div className={styles.paginationControls}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            className={styles.navButton}
          >
            &larr; Anterior
          </button>
          
          <span>Página {currentPage} de {totalPages}</span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            className={styles.navButton}
          >
            Siguiente &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;