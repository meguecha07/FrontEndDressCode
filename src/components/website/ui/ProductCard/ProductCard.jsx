import { GoStar, GoStarFill } from "react-icons/go";
import styles from "./ProductCard.module.css";
import { useState } from "react";
import { toggleFavorite } from "../../../../services/api";

const ProductCard = ({ product, key, categories, onClick }) => {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Si no se pasa onClick, redirigir directamente al producto
      // Suponiendo que product.id está definido
      // Asumiendo que la navegación a producto se hace con  `/product/${product.id}`
      // Verifica y ajusta la ruta según tu enrutamiento
      // navigate(`/product/${product.id}`); // Asegúrate de tener useNavigate importado si lo usas aquí
    }
  };

  const handleStarClick = (event) => {
    toggleFavorite(key, isStarFilled);
    event.stopPropagation();
    setIsStarFilled(!isStarFilled);
    console.log("Star clicked, isStarFilled:", !isStarFilled);
  };

  // Extraer imagen base64 si está disponible
  const productImage =
    product.images?.length > 0
      ? `data:image/jpeg;base64,${product.images[0].imageContent}`
      : "https://via.placeholder.com/200";

  const productName = product.name || "Nombre no disponible";
  const productPrice =
    product.price !== null && product.price !== undefined
      ? `$${product.price.toFixed(2)}`
      : "Precio no disponible";
  const categoryName = product.category?.categoryName || "Sin categoría";
  const productColorName = product.color?.colorName || "transparent";

  return (
    <div className={styles.productCard}>
      <div className={styles.productContainer} onClick={handleClick}>
        <div className={styles.imageContainer}>
          <img src={productImage} alt={productName} className={styles.image} />
        </div>
        <div className={styles.details}>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            {isStarFilled ? (
              <GoStarFill
                className={`${styles.favoriteIcon} ${
                  isStarFilled ? styles.filled : ""
                }`}
                onClick={handleStarClick}
              />
            ) : (
              <GoStar
                className={`${styles.favoriteIcon} ${
                  isStarFilled ? styles.filled : ""
                }`}
                onClick={handleStarClick}
              />
            )}
          </div>
          <div>
            <div className={styles.rowDetails}>
              <p className={styles.category}>{categoryName}</p>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: productColorName }}
              ></div>
            </div>
            <div className={styles.rowDetails}>
              <h3 className={styles.title}>{productName}</h3>
              <p className={styles.price}>{productPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
