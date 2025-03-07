// ProductDetail.jsx
import styles from './ProductDetail.module.css';

// metaItems.json
const metaItems=[
    {
      "label": "Material",
      "value": "Algodón",
      "icon": "fa-solid fa-tshirt"
    },
    {
      "label": "Estado",
      "value": "Nuevo",
      "icon": "fa-solid fa-certificate"
    },
    {
      "label": "Estilo",
      "value": "Casual",
      "icon": "fa-solid fa-shirt"
    },
    {
      "label": "Temporada",
      "value": "Verano",
      "icon": "fa-solid fa-sun"
    },
    {
      "label": "Ocasión",
      "value": "Fiesta",
      "icon": "fa-solid fa-glass-cheers"
    },
    {
      "label": "Marca/Diseñador",
      "value": "Zara",
      "icon": "fa-solid fa-tag"
    },
    {
      "label": "Patrón",
      "value": "Estampado",
      "icon": "fa-solid fa-paint-brush"
    },
    {
      "label": "Largo",
      "value": "Corto",
      "icon": "fa-solid fa-ruler"
    },
    {
      "label": "Ajuste",
      "value": "Entallado",
      "icon": "fa-solid fa-arrows-alt-v"
    },
    {
      "label": "Género",
      "value": "Femenino",
      "icon": "fa-solid fa-venus"
    }
  ]

const ProductDetail = ({ category, color, size, sku }) => {
    return (
      <div className={styles.metaGrid}>
        {/* MetaItems originales */}
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>
            <i className="fa-solid fa-tag"></i> Categoría
          </span>
          <span className={styles.metaValue}>{category}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>
            <i className="fa-solid fa-palette"></i> Color
          </span>
          <span className={styles.metaValue}>{color}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>
            <i className="fa-solid fa-ruler"></i> Talla
          </span>
          <span className={styles.metaValue}>{size}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>
            <i className="fa-solid fa-barcode"></i> SKU
          </span>
          <span className={styles.metaValue}>{sku}</span>
        </div>
  
        {/* MetaItems adicionales desde el JSON */}
        {metaItems.map((item, index) => (
          <div className={styles.metaItem} key={index}>
            <span className={styles.metaLabel}>
              <i className={item.icon}></i> {item.label}
            </span>
            <span className={styles.metaValue}>{item.value}</span>
          </div>
        ))}
      </div>
    );
  };
  

export default ProductDetail;