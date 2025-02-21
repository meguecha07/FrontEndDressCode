import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProductById } from '../../services/api'; // Asegúrate de tener esta función en 'api.js'
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();  // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener el detalle del producto
    const loadProduct = async () => {
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    };

    loadProduct();
  }, [id]); // Vuelve a cargar si el ID cambia

  if (!product) return <div>Cargando...</div>; // Mientras se carga el producto

  return (
    <div className={styles.productPage}>
      <h1 className={styles.productTitle}>{product.name}</h1> {/* Alinea el título a la izquierda */}
      <img src={product.image} alt={product.name} className={styles.productImage} />

      <div className={styles.productDetails}>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>${product.price}</p>
      </div>

      <button className={styles.addToCartButton}>Añadir al carrito</button>
    </div>
  );
};

export default ProductPage;


