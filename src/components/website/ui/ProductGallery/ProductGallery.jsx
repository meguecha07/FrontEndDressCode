import { useState } from 'react';
import Modal from '../Modal/Modal';
import styles from './ProductGallery.module.css';

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.gallery}>
      {/* Imagen principal */}
      <div className={styles.mainImageContainer}>
        <img
          src={selectedImage}
          alt="Imagen principal del producto"
          className={styles.mainImage}
        />
      </div>

      {/* Miniaturas */}
      <div className={styles.gridContainer}>
        <div className={styles.imageGrid}>
          {images
          .filter(image => image !== selectedImage) // Evita repetir la imagen seleccionada
          .slice(0, 4) // Solo mostramos 4 miniaturas
          .map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Vista ${index + 1} del producto`}
              className={styles.thumbnail}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>


          <button 
            className={styles.viewMoreButton} 
            onClick={() => setIsModalOpen(true)}
          >
            Ver Más
          </button>
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