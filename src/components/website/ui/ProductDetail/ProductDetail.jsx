import { useState, useEffect } from 'react';
import { fetchAttributes } from '../../../../services/adminApi';
import styles from './ProductDetail.module.css';

const ProductDetail = ({ size, sku, categoryId, colorId, attributesIds, categories, colors }) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAttributes = await fetchAttributes();
        setAttributes(fetchedAttributes.filter(attr => attributesIds.includes(attr.attributeId)));
      } catch (error) {
        console.error("Error al obtener atributos:", error);
      }
    };

    fetchData();
  }, [attributesIds]);

  const category = categories.find(cat => cat.categoryId === categoryId);
  const color = colors.find(col => col.colorId === colorId);

  return (
    <div>
      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>
            <i className="fa-solid fa-tag"></i> Categoría
          </span>
          <span className={styles.metaValue}>{category?.name || "Sin categoría"}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>
            <i className="fa-solid fa-palette"></i> Color
          </span>
          <span className={styles.metaValue}>{color?.name || "Sin color"}</span>
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

      {attributes.length > 0 && (
        <div className={styles.attributesSection}>
          <h2 className={styles.sectionTitle}>Características</h2>
          <div className={styles.metaGrid}>
            {attributes.map((attr) => (
              <div key={attr.attributeId} className={styles.metaItem}>
                <label className={styles.metaLabel}>
                  <img src={attr.iconUrl} alt={attr.name} className={styles.attributeIcon} />
                  <span className={styles.metaValue}>{attr.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
