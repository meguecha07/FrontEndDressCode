import { useState } from 'react';
import styles from './ProductFormModal.module.css';  // Importa el archivo de estilos

const ProductFormModal = ({ onSave, onClose }) => {
  const [product, setProduct] = useState({ name: '', price: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(product);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Registrar Producto</h3>
        <input 
          type="text" 
          name="name" 
          value={product.name} 
          onChange={handleChange} 
          placeholder="Nombre" 
        />
        <input 
          type="number" 
          name="price" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Precio" 
        />
        <input 
          type="text" 
          name="image" 
          value={product.image} 
          onChange={handleChange} 
          placeholder="Imagen URL" 
        />
        <button onClick={handleSave}>Guardar</button>
        <button className={styles.cancel} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ProductFormModal;
