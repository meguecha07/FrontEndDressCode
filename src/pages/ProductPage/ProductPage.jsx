import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchProductById, getReservations, fetchCategories, fetchColors, addFavorite, deleteFavorite, getUser, getReservedDates } from "../../services/api";
import styles from "./ProductPage.module.css";
import ProductGallery from "../../components/website/ui/ProductGallery/ProductGallery";
import ProductDetail from "../../components/website/ui/ProductDetail/ProductDetail";
import LoadingSpinner from "../../components/LoadingSpinner";
import Notification from "../../components/Notification/Notification";
import ShareModal from "../../components/website/ui/ShareModal/ShareModal";
import PoliciesList from "../../components/website/ui/PoliciesList/PoliciesList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
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
  const [reservedDates, setReservedDates] = useState([]);

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
        loadReservedDates(fetchedProduct.clotheId);
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

    const loadReservedDates = async (clotheId) => {
      try {
        const reservedDates = await getReservedDates(clotheId);
        setReservedDates(reservedDates);
      } catch (error) {
        console.error("Error al obtener las fechas reservadas:", error);
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

  const handleDateChange = (date, type) => {
    setDates((prevDates) => ({
      ...prevDates,
      [type]: date,
    }));

    if (type === "startDate") {
      if (dates.endDate && date >= dates.endDate) {
        setDates((prevDates) => ({
          ...prevDates,
          endDate: null,
        }));
      }
    }

    checkAvailability(date, dates.endDate, type);
  };

  const checkAvailability = (startDate, endDate, type) => {
    if (startDate && endDate && startDate >= endDate) {
      setIsAvailable(false);
      return;
    }

    const overlap = reservations.some((reservation) => {
      const resStartDate = new Date(reservation.startDate);
      const resEndDate = new Date(reservation.endDate);

      return (
        (startDate >= resStartDate && startDate <= resEndDate) ||
        (endDate >= resStartDate && endDate <= resEndDate)
      );
    });
    setIsAvailable(!overlap);
  };

  const handleCartAction = () => {
    // Verifica si el usuario está logueado
    if (!user) {
      // Guarda solo la ruta de la página actual (sin el dominio)
      localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
  
      setNotification({
        show: true,
        message: "Debes iniciar sesión para añadir al carrito",
        button: {
          label: "Iniciar sesión",
          action: () => navigate("/login"),  // Redirige al login
        },
      });
      return;
    }
  
    // Verifica si las fechas están seleccionadas
    if (!dates.startDate || !dates.endDate) {
      setNotification({
        show: true,
        message: "Debes seleccionar las fechas de inicio y fin antes de añadir al carrito",
        button: null, // No hay botón de acción
      });
      return;
    }
  
    // Verifica si las fechas son válidas (la fecha de inicio debe ser anterior a la de fin)
    if (dates.startDate >= dates.endDate) {
      setNotification({
        show: true,
        message: "La fecha de inicio debe ser anterior a la fecha de fin",
        button: null, // No hay botón de acción
      });
      return;
    }
  
    // Si las fechas son correctas, procede a agregar al carrito
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
  
    const newItem = {
      clotheId: product.clotheId,
      name: product.name,
      description: product.description,
      price: product.price,
      size: product.size,
      image: product.imageUrls[0],
      startDate: dates.startDate,
      endDate: dates.endDate,
    };
  
    if (isInCart) {
      cartItems = cartItems.filter((item) => item.clotheId !== product.clotheId);
    } else {
      cartItems.push(newItem);
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
        productId={product.id}
          size={product.size}
          sku={product.sku}
          categoryId={product.categoryId}
          colorId={product.colorId}
          attributesIds={product.attributeIds}
          categories={categories}
          colors={colors}
        />

        <div className={styles.priceSection}>
          <div className={styles.buttons}>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ""}`}
              onClick={handleFavoriteAction}
              aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
            >
              <i className={`fa-heart ${isFavorite ? "fa-solid" : "fa-regular"}`}></i>
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

          <div className={styles.dateSelector}>
            <label>Fecha de inicio</label>
            <DatePicker
              selected={dates.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              excludeDates={reservedDates.map(date => new Date(date))}
              dayClassName={(date) => {
                const isReserved = reservedDates.some(
                  (reservedDate) => reservedDate.toString() === date.toISOString().split('T')[0]
                );
                return isReserved ? styles.reservedDate : null;
              }}
            />

            <label>Fecha de fin</label>
            <DatePicker
              selected={dates.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              minDate={dates.startDate || new Date()}
              dateFormat="yyyy-MM-dd"
              excludeDates={reservedDates.map(date => new Date(date))}
              dayClassName={(date) => {
                const isReserved = reservedDates.some(
                  (reservedDate) => reservedDate.toString() === date.toISOString().split('T')[0]
                );
                return isReserved ? styles.reservedDate : null;
              }}
            />

            {!isAvailable && (
              <p style={{ color: "red" }}>Las fechas no están disponibles</p>
            )}
          </div>

          <button
            className={`${styles.addToCartButton} ${isInCart ? styles.removeFromCart : ""}`}
            onClick={handleCartAction}
          >
            {isInCart ? (
              <>Eliminar del carrito <i className="fa-solid fa-trash-can"></i></>
            ) : (
              <>Añadir al carrito <i className="fa-solid fa-cart-plus"></i></>
            )}
          </button>
        </div>

        <div className={styles.descriptionSection}>
          <h2 className={styles.sectionTitle}>Descripción</h2>
          <p className={styles.productDescription}>{product.description}</p>
        </div>
      </div>
      <PoliciesList />
    </div>
  );
};

export default ProductPage;
