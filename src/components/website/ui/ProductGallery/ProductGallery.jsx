import { useState } from 'react';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleViewMore = () => {
    // Lógica para abrir la galería completa
    console.log('Ver Más');
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
          {images.slice(1, 5).map((image, index) => (
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
    </div>
  );
};

export default ProductGallery;
