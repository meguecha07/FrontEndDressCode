import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProductById, fetchCategories, fetchColors } from '../../services/api';
import styles from './ProductPage.module.css';
import ProductGallery from '../../components/website/ui/ProductGallery/ProductGallery';
import ProductDetail from '../../components/website/ui/ProductDetail/ProductDetail';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        const fetchedCategories = await fetchCategories();
        const fetchedColors = await fetchColors();

        setProduct(fetchedProduct);
        setCategories(fetchedCategories);
        setColors(fetchedColors);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <LoadingSpinner />;

  return (
    <div className={styles.productPage}>
      <div className={styles.header}>
        
        <h1 className={styles.productTitle}>{product.name}</h1>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div className={styles.galleryContainer}>
        <ProductGallery images={product.imageUrls} />
      </div>

      <div className={styles.detailsGrid}>
        <ProductDetail
          size={product.size}
          sku={product.sku}
          categoryId={product.categoryId}
          colorId={product.colorId}
          attributesIds={product.attributeIds}
          categories={categories}
          colors={colors}
        />

        <div className={styles.priceSection}>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <span 
            className={styles.stockStatus}
            style={{ color: product.stock > 0 ? '#4CAF50' : '#F44336' }}
          >
            {product.stock > 0 ? `Disponible (${product.stock} unidades)` : 'Agotado'}
          </span>
          <button className={styles.addToCartButton}>
            Añadir al carrito
            <i className="fa-solid fa-cart-plus"></i>
          </button>
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Descripción</h2>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;