import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchProductById, fetchCategories, fetchColors, addFavorite, deleteFavorite } from '../../services/api';
import styles from './ProductPage.module.css';
import ProductGallery from '../../components/website/ui/ProductGallery/ProductGallery';
import ProductDetail from '../../components/website/ui/ProductDetail/ProductDetail';
import LoadingSpinner from '../../components/LoadingSpinner';
import Notification from '../../components/Notification/Notification';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        const fetchedCategories = await fetchCategories();
        const fetchedColors = await fetchColors();

        setProduct(fetchedProduct);
        setCategories(fetchedCategories);
        setColors(fetchedColors);
        checkCartStatus(fetchedProduct.clotheId);
        checkFavoriteStatus(fetchedProduct.clotheId);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    const checkCartStatus = (productId) => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setIsInCart(cartItems.some(item => item.clotheId === productId));
    };

    const checkFavoriteStatus = (productId) => {
      if (user) {
        const isFav = user.favoriteClothes?.some(fav => fav.clotheId === productId);
        setIsFavorite(isFav);
      }
    };

    loadProduct();
  }, [id, user]);

  const handleCartAction = () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const actionMessage = isInCart 
      ? `${product.name} eliminado del carrito` 
      : `${product.name} añadido al carrito`;

    if (isInCart) {
      cartItems = cartItems.filter(item => item.clotheId !== product.clotheId);
    } else {
      cartItems.push({
        clotheId: product.clotheId,
        name: product.name,
        price: product.price,
        size: product.size,
        image: product.imageUrls[0]
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setIsInCart(!isInCart);
    
    setNotificationMessage(actionMessage);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleFavoriteAction = async () => {
    if (!user) {
      setNotificationMessage('Debes iniciar sesión para añadir a favoritos');
      setShowNotification(true);
      return;
    }

    try {
      if (isFavorite) {
        await deleteFavorite(user.id, product.clotheId);
        setNotificationMessage('Eliminado de favoritos');
      } else {
        await addFavorite(user.id, product.clotheId);
        setNotificationMessage('Añadido a favoritos');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error en favoritos:", error);
      setNotificationMessage('Error al actualizar favoritos');
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (!product) return <LoadingSpinner />;

  return (
    <div className={styles.productPage}>
      {showNotification && (
        <Notification 
          message={notificationMessage} 
          onClose={() => setShowNotification(false)}
        />
      )}
      
      <div className={styles.header}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <div className={styles.galleryContainer}>
        <ProductGallery images={product.imageUrls} />
        <button 
          className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
          onClick={handleFavoriteAction}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
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
          <button 
            className={`${styles.addToCartButton} ${isInCart ? styles.removeFromCart : ''}`}
            onClick={handleCartAction}
          >
            {isInCart ? (
              <>
                Eliminar del carrito
                <i className="fa-solid fa-trash-can"></i>
              </>
            ) : (
              <>
                Añadir al carrito
                <i className="fa-solid fa-cart-plus"></i>
              </>
            )}
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