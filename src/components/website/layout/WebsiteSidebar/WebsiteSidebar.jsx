import React, { useState, useEffect } from 'react';
import styles from './WebsiteSidebar.module.css';

const WebsiteSidebar = ({ isMobileSidebarOpen, toggleMobileSidebar, categories, selectedCategories, onSelectCategory, products }) => { 
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  const categoryCounts = categories.map(category => ({
    ...category,
    count: products.filter(product => product.categoryId === category.categoryId).length,
  }));

  return (
    <aside className={`${styles.sidebar} ${isMobileSidebarOpen ? styles.open : ''}`}> 
      <div className={styles.filterSection}>
        <div className={styles.filterHeader} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          Categoría
          <span className={styles.arrow}>{isCategoryOpen ? '▲' : '▼'}</span>
        </div>
        {isCategoryOpen && (
          <ul className={styles.filterList}>
            {categoryCounts.map(category => (
              <li key={category.categoryId} className={styles.filterItem}>
                <label>
                  <input type="checkbox" value={category.categoryId} checked={selectedCategories.includes(category.categoryId)} onChange={() => onSelectCategory(category.categoryId)} />
                  {category.name} <span className={styles.filterCount}>({category.count})</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterHeader} onClick={() => setIsSizeOpen(!isSizeOpen)}>
          Talla
          <span className={styles.arrow}>{isSizeOpen ? '▲' : '▼'}</span>
        </div>
        {isSizeOpen && (
          <ul className={styles.filterList}>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <li key={size} className={styles.filterItem}>
                <label>
                  <input type="checkbox" value={size} />
                  {size} <span className={styles.filterCount}>(10)</span> {/* Ejemplo de conteo */}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterHeader} onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}>
          Disponibilidad
          <span className={styles.arrow}>{isAvailabilityOpen ? '▲' : '▼'}</span>
        </div>
        {isAvailabilityOpen && (
          <ul className={styles.filterList}>
            {['Disponible', 'Sin Disponibilidad'].map(availability => (
              <li key={availability} className={styles.filterItem}>
                <label>
                  <input type="checkbox" value={availability} />
                  {availability} <span className={styles.filterCount}>(5)</span> {/* Ejemplo de conteo */}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className={styles.closeButton} onClick={toggleMobileSidebar}>Cerrar Filtros</button>
    </aside>
  );
};

export default WebsiteSidebar;
