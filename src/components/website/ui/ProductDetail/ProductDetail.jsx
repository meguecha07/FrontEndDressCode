// ProductDetail.jsx
import styles from './ProductDetail.module.css';

const ProductDetail = ({ category, color, size, sku, attributes }) => {
    return (
      <div>
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
  
       
        
      </div>
       {/* Características del producto */}
       {attributes && attributes.length > 0 && (
        <div className={styles.attributesSection}>
          <h2 className={styles.sectionTitle}>Características</h2>
          <div className={styles.metaGrid}>
            {attributes.map((attr) => (
              <div key={attr.attributeId} className={styles.metaItem}>
                <label className={styles.metaLabel}>
                <img src={attr.iconUrl} alt={attr.name} className={styles.attributeIcon} />
                <span className={styles.metaValue}>{attr.name}</span></label>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    );
  };
  

export default ProductDetail;