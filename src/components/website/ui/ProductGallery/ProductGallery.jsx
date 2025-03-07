import { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleViewMore = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.gallery}>
      {/* Imagen principal en la mitad izquierda */}
      <div className={styles.mainImageContainer}>
        <img src={selectedImage} alt="Producto" className={styles.mainImage} />
      </div>

      {/* Mitad derecha con grilla y botón "Ver Más" */}
      <div className={styles.gridContainer}>
        <div className={styles.imageGrid}>
          {images.slice(1, 5).map((image, index) => ( // Muestra máximo 4 imágenes
            <img
              key={index}
              src={image}
              alt={`Vista ${index + 1}`}
              className={styles.thumbnail}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <button className={styles.viewMoreButton} onClick={handleViewMore}>
          Ver Más
        </button>
      </div>

      {/* Modal para ver todas las imágenes */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseButton} onClick={handleCloseModal}>
              &times;
            </button>
            <img
              src={images[modalImageIndex]}
              alt="Producto"
              className={styles.modalImage}
            />
            <button className={styles.modalNavButtonLeft} onClick={handlePrevImage}>
              &#10094;
            </button>
            <button className={styles.modalNavButtonRight} onClick={handleNextImage}>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;