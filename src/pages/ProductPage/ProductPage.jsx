import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProductById } from '../../services/api';
import styles from './ProductPage.module.css';
import ProductGallery from '../../components/website/ui/ProductGallery/ProductGallery';
import ProductDetail from '../../components/website/ui/ProductDetail/ProductDetail';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return (
    <div className={styles.productPage}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className={styles.productTitle}>{product.name}</h1>
      </div>
      <ProductGallery images={product.images} />
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      <button className={styles.addToCartButton}>Añadir al carrito</button>
    </div>
  );
};

export default ProductPage;
