import styles from './ProductCard.module.css';

const ProductCard = ({ product, categories, colors, onClick }) => {
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

    const productImage = product.imageUrls?.length > 0 
    ? `${product.imageUrls[0]}` 
    : 'https://via.placeholder.com/200';

  const productName = product.name || "Nombre no disponible";
  const productPrice = product.price !== null && product.price !== undefined 
    ? `$${product.price.toFixed(2)}` 
    : "Precio no disponible";
  const category = categories.find(cat => cat.categoryId === product.categoryId);
  const categoryName = category ? category.name : "Sin categoría";
  const color = colors.find(col => col.colorId === product.colorId);
  const productColorName = color ? color.name : "transparent";
    

  return (
    <div className={styles.productCard}>
      <div className={styles.productContainer} onClick={handleClick}>
        <div className={styles.imageContainer}>
          <img src={productImage} alt={productName} className={styles.image} />
        </div>
        <div className={styles.details}>
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
  );
};

export default ProductCard;
