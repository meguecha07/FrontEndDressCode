import { useState, useEffect } from 'react';
import styles from './ProductFormModal.module.css';

const ProductFormModal = ({ initialData, onSave, onClose }) => {
  const [product, setProduct] = useState({
    name: '',
    color: '',
    categoryId: '',
    price: '',
    image: [''], // Array para almacenar múltiples imágenes
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        color: initialData.color || '',
        categoryId: initialData.categoryId || '',
        price: initialData.price || '',
        image: (initialData.image && initialData.image.length > 0) ? initialData.image : [''],
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (index, value) => {
    setProduct(prev => {
      const newImages = [...prev.image];
      newImages[index] = value;
      return { ...prev, image: newImages };
    });
  };

  const handleAddImageField = () => {
    setProduct(prev => ({
      ...prev,
      image: [...prev.image, '']
    }));
  };

  const handleRemoveImageField = (index) => {
    setProduct(prev => {
      const newImages = prev.image.filter((_, i) => i !== index);
      // Se asegura que siempre haya al menos un campo
      return { ...prev, image: newImages.length ? newImages : [''] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      categoryId: parseInt(product.categoryId, 10),
      image: product.image.filter(url => url.trim() !== '')
    };
    onSave(formattedProduct);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className={styles.scrollContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>
                <span>Nombre del Producto</span>
                <input 
                  type="text" 
                  name="name" 
                  value={product.name} 
                  onChange={handleChange} 
                  className={styles.input}
                  required 
                />
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span>Color</span>
                <div className={styles.colorInput}>
                  <input 
                    type="text" 
                    name="color" 
                    value={product.color} 
                    onChange={handleChange} 
                    className={styles.input}
                    placeholder="Ej: #HEX o nombre"
                    required 
                  />
                  <div 
                    className={styles.colorPreview} 
                    style={{ backgroundColor: product.color }}
                  />
                </div>
              </label>
            </div>

            <div className={styles.grid}>
              <div className={styles.formGroup}>
                <label>
                  <span>Categoría ID</span>
                  <input 
                    type="number" 
                    name="categoryId" 
                    value={product.categoryId} 
                    onChange={handleChange} 
                    className={styles.input}
                    required 
                  />
                </label>
              </div>
              
              <div className={styles.formGroup}>
                <label>
                  <span>Precio</span>
                  <div className={styles.priceInput}>
                    <span className={styles.currency}>$</span>
                    <input 
                      type="number" 
                      step="0.01" 
                      name="price" 
                      value={product.price} 
                      onChange={handleChange} 
                      className={styles.input}
                      required 
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span>Imágenes</span>
                <div className={styles.imageFields}>
                  {product.image.map((img, index) => (
                    <div key={index} className={styles.imageInput}>
                      <input 
                        type="text" 
                        value={img} 
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className={styles.input}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        required
                      />
                      {product.image.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveImageField(index)} 
                          className={styles.removeImageButton}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={handleAddImageField} 
                    className={styles.addImageButton}
                  >
                    <i className="fas fa-plus"></i>
                    Agregar URL de imagen
                  </button>
                </div>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>
                <span>Descripción</span>
                <textarea 
                  name="description" 
                  value={product.description} 
                  onChange={handleChange} 
                  className={styles.textarea}
                  rows="4"
                  required 
                />
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.submitButton}>
                {initialData ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;