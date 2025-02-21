import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProductById } from '../../services/api';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Reemplaza useHistory con useNavigate
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    };

    loadProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className={styles.productPage}>
      {/* Contenedor para la flecha y el título */}
      <div className={styles.header}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <button className={styles.backButton} onClick={() => navigate(-1)}>←</button>
      </div>

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