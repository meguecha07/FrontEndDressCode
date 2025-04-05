import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  fetchProductById,
  fetchCategories,
  fetchColors,
  addFavorite,
  deleteFavorite,
  getUser,
  getReviewsByClotheId,
  getClotheRating,
  getReservationsByUser,
  getReservations
} from "../../services/api";
import styles from "./ProductPage.module.css";
import ProductGallery from "../../components/website/ui/ProductGallery/ProductGallery";
import ProductDetail from "../../components/website/ui/ProductDetail/ProductDetail";
import LoadingSpinner from "../../components/LoadingSpinner";
import Notification from "../../components/Notification/Notification";
import ShareModal from "../../components/website/ui/ShareModal/ShareModal";
import PoliciesList from "../../components/website/ui/PoliciesList/PoliciesList";
import StarRating from "../../components/website/ui/StarRating/StarRating";
import BarChart from "../../components/website/ui/BarChart/BarChart";
import UserReview from "../../components/website/ui/UserReview/UserReview";
import ModalAddReview from "../../components/website/ui/ModalAddReview/ModalAddReview";
import DoubleCalendar from "../../components/DoubleCalendar/DoubleCalendar";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewCounts, setReviewCounts] = useState([0, 0, 0, 0, 0]);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    button: null,
  });
  const [isInCart, setIsInCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [hasReservation, setHasReservation] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null
  });
  const [conflictReservation, setConflictReservation] = useState(null);

  const activeReservations = useMemo(() => {
    if (!product) return [];
    return reservations.flatMap(reservation => 
      reservation.items.filter(item => 
        item.clotheId === product.clotheId && 
        item.itemReservationStatus !== "DEVUELTO"
      )
    );
  }, [reservations, product]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        const fetchedCategories = await fetchCategories();
        const fetchedColors = await fetchColors();
        const fetchedReviews = await getReviewsByClotheId(id);
        const fetchedRating = await getClotheRating(id);

        const counts = [0, 0, 0, 0, 0];
        fetchedReviews.forEach((review) => {
          counts[review.rating - 1] += 1;
        });

        setProduct(fetchedProduct);
        setCategories(fetchedCategories);
        setColors(fetchedColors);
        setReviews(fetchedReviews);
        setRating(fetchedRating || 0);
        setReviewCounts(counts);

        // Cargar fechas del carrito si existe
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingItem = cartItems.find(item => item.clotheId === fetchedProduct.clotheId);
        if (existingItem) {
          setSelectedDates({
            start: new Date(existingItem.startDate + 'T00:00:00'),
            end: new Date(existingItem.endDate + 'T00:00:00')
          });
          setIsInCart(true);
        }
      } catch (error) {
        console.error("Error al obtener los datos del producto:", error);
      }
    };

    const loadUserData = async () => {
      if (user) {
        try {
          const data = await getUser(user.id);
          setUserData(data);
          if (product) {
            const isFav = data.favoriteClothes?.some(
              (fav) => fav.clotheId === product.clotheId
            );
            setIsFavorite(isFav);
          }
        } catch (error) {
          console.error("Error cargando datos de usuario:", error);
        }
      }
    };

    const loadReservationsData = async () => {
      try {
        const reservationsData = await getReservations();
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error obteniendo reservaciones:", error);
      }
    };

    loadProduct();
    loadUserData();
    loadReservationsData();
  }, [id, user]);

  useEffect(() => {
    if (activeReservations.length > 0) {
      setConflictReservation(activeReservations[0]);
    } else {
      setConflictReservation(null);
    }
  }, [activeReservations]);

  const handleDatesChange = (start, end) => {
    if (start && end) {
      setSelectedDates({ start, end });
    } else if (start) {
      setSelectedDates(prev => ({ 
        start: start,
        end: prev.end 
      }));
    }
  };

  const handleCartAction = () => {
    if (conflictReservation) {
      setNotification({
        show: true,
        message: "Este ítem no está disponible para reserva en este momento",
        button: null
      });
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingIndex = cartItems.findIndex(item => item.clotheId === product.clotheId);

    if (existingIndex !== -1) {
      // Eliminar del carrito
      cartItems = cartItems.filter((_, i) => i !== existingIndex);
      setIsInCart(false);
      setSelectedDates({ start: null, end: null });
      setNotification({
        show: true,
        message: "Producto eliminado del carrito",
        button: null
      });
    } else {
      // Añadir al carrito
      if (!selectedDates.start || !selectedDates.end) {
        setNotification({
          show: true,
          message: "Debes seleccionar las fechas de reserva",
          button: null,
        });
        return;
      }
      
      cartItems.push({
        clotheId: product.clotheId,
        name: product.name,
        price: product.price,
        size: product.size,
        image: product.imageUrls[0],
        startDate: selectedDates.start.toISOString().split('T')[0],
        endDate: selectedDates.end.toISOString().split('T')[0]
      });
      setIsInCart(true);
      setNotification({
        show: true,
        message: `${product.name} añadido al carrito`,
        button: { label: "Ver Carrito", action: () => navigate("/cart") }
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleNotifyMe = () => {
    setNotification({
      show: true,
      message: "Te notificaremos cuando el producto esté disponible",
      button: null
    });
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

  useEffect(() => {
    const checkUserReservations = async () => {
      if (user && product) {
        try {
          const reservations = await getReservationsByUser(user.id);
          const reservationExists = reservations.some((reservation) =>
            reservation.items.some((item) => item.clotheId === product.clotheId)
          );
          setHasReservation(reservationExists);
        } catch (error) {
          console.error("Error al verificar reservas del usuario:", error);
        }
      }
    };

    if (product) checkUserReservations();
  }, [user, product]);

  if (!product) return <LoadingSpinner />;

  const hasDateChanged = () => {
    if (!isInCart || !selectedDates.start || !selectedDates.end) return false;
    const cartItem = JSON.parse(localStorage.getItem("cartItems"))
      ?.find(item => item.clotheId === product.clotheId);
      
    return cartItem?.startDate !== selectedDates.start.toISOString().split('T')[0] ||
           cartItem?.endDate !== selectedDates.end.toISOString().split('T')[0];
  };

  return (
    <div className={styles.productPage}>
      {notification.show && (
        <Notification
          message={notification.message}
          buttonLabel={notification.button?.label}
          buttonAction={notification.button?.action}
          onClose={() => setNotification({ show: false, message: "", button: null })}
        />
      )}

      <div className={styles.header}>
        <div>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div
            className={styles.ratingContainer}
            onClick={() => {
              if (hasReservation) {
                setShowAddReviewModal(true);
              } else {
                setNotification({
                  show: true,
                  message: "Debes tener una reserva para calificar este producto",
                  button: null,
                });
              }
            }}
          >
            <StarRating rating={rating} setRating={null} readOnly />
            <span>({rating.toFixed(1)} de 5.0)</span>
          </div>
        </div>
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

          <DoubleCalendar
            reservations={reservations}
            productId={product.clotheId}
            onDatesChange={handleDatesChange}
            initialStartDate={selectedDates.start}
            initialEndDate={selectedDates.end}
          />

          {conflictReservation && (
            <div className={styles.conflictMessage}>
              <p>
                Este ítem ya se encuentra reservado del {" "}
                {new Date(conflictReservation.startDate + 'T00:00:00').toLocaleDateString()} al {" "}
                {conflictReservation.returnDate 
                  ? new Date(conflictReservation.returnDate + 'T00:00:00').toLocaleDateString()
                  : new Date(conflictReservation.endDate + 'T00:00:00').toLocaleDateString()}
              </p>
              <button 
                className={styles.notifyButton}
                onClick={handleNotifyMe}
              >
                Notificarme cuando esté disponible
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {!conflictReservation && (
              <button
                className={`${styles.addToCartButton} ${
                  isInCart ? styles.removeFromCart : ""
                }`}
                onClick={handleCartAction}
                disabled={!isInCart && (!selectedDates.start || !selectedDates.end)}
              >
                {isInCart ? (
                  hasDateChanged() ? (
                    <>
                      Actualizar fechas
                      <i className="fa-solid fa-arrows-rotate"></i>
                    </>
                  ) : (
                    <>
                      Eliminar del carrito
                      <i className="fa-solid fa-trash-can"></i>
                    </>
                  )
                ) : (
                  <>
                    Añadir al carrito
                    <i className="fa-solid fa-cart-plus"></i>
                  </>
                )}
              </button>
            )}
            <button
              className={`${styles.favoriteButton} ${
                isFavorite ? styles.isFavorite : ""
              }`}
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
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>Descripción</h2>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <div className={styles.reviewSubSection}>
          <h2>Opiniones de Clientes</h2>
          <p>({reviews.length} calificaciones globales)</p>
          <div className={styles.starRating}>
            <StarRating rating={rating} setRating={null} readOnly />
            <p>({rating.toFixed(1)} de 5.0)</p>
          </div>
          <div>
            <BarChart bars={5} values={reviewCounts} color="#4CAF50" />
          </div>
        </div>
        <div className={styles.reviewSubSection}>
          <h2>Principales reseñas</h2>
          <div className={styles.scrollableReviews}>
            {reviews.map((review) => (
              <UserReview
                key={review.reviewId}
                userName={`${user?.firstName || 'Anónimo'} ${user?.lastName || ''}`}
                date="Fecha no disponible"
                review={review.comment}
                rating={review.rating}
              />
            ))}
          </div>
        </div>
      </div>

      <PoliciesList></PoliciesList>

      {showAddReviewModal && (
        <ModalAddReview
          productId={product.clotheId}
          onClose={() => setShowAddReviewModal(false)}
          onReviewSubmitted={(newReview) => {
            setReviews(prev => [...prev, newReview]);
            setShowAddReviewModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductPage;