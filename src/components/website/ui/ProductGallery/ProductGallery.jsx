import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(
    images.length > 0 ? images[0].imageContent : ''
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className={styles.imageGrid}>
          {images.slice(0, 5).map((image) => (
            <img
              key={image.imagenId}
              src={`data:image/png;base64,${image.imageContent}`}
              alt="Vista del producto"
              className={styles.thumbnail}
              onClick={() => setSelectedImage(image.imageContent)}
            />
          ))}
        </div>

        {images.length > 5 && (
          <button 
            className={styles.viewMoreButton} 
            onClick={() => setIsModalOpen(true)}
          >
            Ver Más
          </button>
        )}
      </div>

      {/* Modal para ver todas las imágenes */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        onSelectImage={setSelectedImage}
      />
    </div>
  );
};

export default ProductGallery;