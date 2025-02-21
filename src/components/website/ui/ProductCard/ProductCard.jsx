import styles from './ProductCard.module.css';

const ProductCard = ({ product, categories, onClick }) => {
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

  // Suponiendo que el objeto product tiene una propiedad 'color' para el ejemplo
  const productColor = product.color || 'transparent'; // Color por defecto si no hay color definido
  const productImage = product.image?.[0] || 'https://via.placeholder.com/200';

  // Buscar el nombre de la categoría usando el ID
  const categoryObj = categories.find(cat => cat.id === product.categoryId);
  const categoryName = categoryObj ? categoryObj.name : "Sin categoría";

  return (
    <div className={styles.productCard} >
      <div className={styles.productContainer} onClick={handleClick}>
        <div className={styles.imageContainer}>
          <img src={productImage} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.details}>
          <div className={styles.rowDetails}>
             <p className={styles.category}>{categoryName}</p>
            <div className={styles.colorBox} style={{ backgroundColor: productColor }}></div>
          </div>
          <div className={styles.rowDetails}>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.price}>${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;