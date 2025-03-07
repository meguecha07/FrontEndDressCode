import { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, images, onSelectImage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9; // 3 columnas x 3 filas
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (!isOpen) return null;

  const startIndex = (currentPage - 1) * imagesPerPage;
  const visibleImages = images.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <div className={styles.imageGrid}>
          {visibleImages.map((image) => (
            <img
              key={image.imagenId}
              src={`data:image/png;base64,${image.imageContent}`}
              alt="Imagen del producto"
              className={styles.modalImage}
              onClick={() => {
                onSelectImage(image.imageContent);
                onClose();
              }}
            />
          ))}
        </div>

        <div className={styles.paginationControls}>
          <button 
            onClick={handlePrevious} 
            disabled={currentPage === 1}
            className={styles.navButton}
          >
            &larr; Anterior
          </button>
          
          <span>Página {currentPage} de {totalPages}</span>
          
          <button 
            onClick={handleNext} 
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