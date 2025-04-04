import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchProductById, fetchCategories, fetchColors, addFavorite, deleteFavorite, getUser} from "../../services/api";
import styles from "./ProductPage.module.css";
import ProductGallery from "../../components/website/ui/ProductGallery/ProductGallery";
import ProductDetail from "../../components/website/ui/ProductDetail/ProductDetail";
import LoadingSpinner from "../../components/LoadingSpinner";
import Notification from "../../components/Notification/Notification";
import ShareModal from "../../components/website/ui/ShareModal/ShareModal";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    button: null,
  });
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

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
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    const loadUserData = async () => {
      if (user) {
        try {
          const data = await getUser(user.id);
          setUserData(data);
          checkFavoriteStatus(data);
        } catch (error) {
          console.error("Error cargando datos de usuario:", error);
        }
      }
    };

    const checkCartStatus = (productId) => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setIsInCart(cartItems.some((item) => item.clotheId === productId));
    };

    const checkFavoriteStatus = (userData) => {
      if (userData?.favoriteClothes && product) {
        const isFav = userData.favoriteClothes.some(
          (fav) => fav.clotheId === product.clotheId
        );
        setIsFavorite(isFav);
      }
    };

    loadProduct();
    loadUserData();
  }, [id, user]);

  useEffect(() => {
    if (userData && product) {
      const isFav = userData.favoriteClothes?.some(
        (fav) => fav.clotheId === product.clotheId
      );
      setIsFavorite(isFav);
    }
  }, [userData, product]);

  const handleCartAction = () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const actionMessage = isInCart
      ? `${product.name} eliminado del carrito`
      : `${product.name} añadido al carrito`;

    const newNotification = {
      show: true,
      message: actionMessage,
      button: {
        label: "Ver Carrito",
        action: () => navigate("/cart"),
      },
    };

    if (isInCart) {
      cartItems = cartItems.filter(
        (item) => item.clotheId !== product.clotheId
      );
    } else {
      cartItems.push({
        clotheId: product.clotheId,
        name: product.name,
        price: product.price,
        size: product.size,
        image: product.imageUrls[0],
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setIsInCart(!isInCart);
    setNotification(newNotification);
  };

  const handleFavoriteAction = async () => {
    if (!user) {
      setNotification({
        show: true,
        message: "Debes iniciar sesión para manejar favoritos",
        button: {
          label: "Iniciar sesión",
          action: () => navigate("/login"),
        },
      });
      return;
    }

    try {
      if (isFavorite) {
        await deleteFavorite(user.id, product.clotheId);
        setNotification({
          show: true,
          message: "Eliminado de favoritos",
          button: null,
        });
      } else {
        await addFavorite(user.id, product.clotheId);
        setNotification({
          show: true,
          message: "Añadido a favoritos",
          button: {
            label: "Ver Favoritos",
            action: () => navigate("/favorites"),
          },
        });
      }

      // Actualizar datos de usuario después de la acción
      const updatedUser = await getUser(user.id);
      setUserData(updatedUser);
    } catch (error) {
      console.error("Error en favoritos:", error);
      setNotification({
        show: true,
        message: "Error al actualizar favoritos",
        button: null,
      });
    }
  };

  if (!product) return <LoadingSpinner />;

  return (
    <div className={styles.productPage}>
      {notification.show && (
        <Notification
          message={notification.message}
          buttonLabel={notification.button?.label}
          buttonAction={notification.button?.action}
          onClose={() =>
            setNotification({ show: false, message: "", button: null })
          }
        />
      )}

      <div className={styles.header}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Volver atrás"
        >
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
            style={{ color: product.stock > 0 ? "#4CAF50" : "#F44336" }}
          >
            {product.stock > 0
              ? `Disponible (${product.stock} unidades)`
              : "Agotado"}
          </span>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button
              className={`${styles.addToCartButton} ${
                isInCart ? styles.removeFromCart : ""
              }`}
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
            <button
              className={`${styles.favoriteButton} ${
                isFavorite ? styles.isFavorite : ""
              }`}
              onClick={handleFavoriteAction}
              aria-label={
                isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"
              }
            >
              <i
                className={`fa-heart ${isFavorite ? "fa-solid" : "fa-regular"}`}
              ></i>
            </button>

            <button
              className={styles.shareButton}
              onClick={() => setIsShareModalOpen(true)}
            >
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            {isShareModalOpen && (
              <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                product={product}
              />
            )}
          </div>
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
