import { useState } from 'react';
import styles from './ProductGallery.module.css';


const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0].imageContent : '');
  const [showAllImages, setShowAllImages] = useState(false);

  const handleViewMore = () => {
    setShowAllImages(!showAllImages);
  };

  return (
    <div className={styles.gallery}>
      {/* Imagen principal */}
      <div className={styles.mainImageContainer}>
        <img
          src={`data:image/png;base64,${selectedImage}`}
          alt="Imagen principal del producto"
          className={styles.mainImage}
        />
      </div>

      {/* Miniaturas */}
      <div className={styles.gridContainer}>
        <div className={`${styles.imageGrid} ${showAllImages ? styles.scrollable : ''}`}>
          {images.slice(0, showAllImages ? images.length : 5).map((image, index) => (
            <img
              key={image.imagenId}
              src={`data:image/png;base64,${image.imageContent}`}
              alt={`Vista ${index + 1} del producto`}
              className={styles.thumbnail}
              onClick={() => setSelectedImage(image.imageContent)}
            />
          ))}
        </div>
        {!showAllImages && images.length > 5 && (
          <button className={styles.viewMoreButton} onClick={handleViewMore}>
            Ver Más
          </button>
        )}

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