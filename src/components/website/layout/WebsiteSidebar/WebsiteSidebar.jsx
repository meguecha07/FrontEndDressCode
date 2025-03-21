import React, { useState, useEffect } from 'react';
import styles from './WebsiteSidebar.module.css';

const WebsiteSidebar = ({ 
  isMobileSidebarOpen, 
  toggleMobileSidebar, 
  categories, 
  selectedCategories, 
  onSelectCategory, 
  products, 
  selectedSizes,
  onSelectSize,
  selectedAvailability,
  onSelectAvailability
}) => { 
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  // Calcular conteo de productos por categoría
  const categoryCounts = categories.map(category => ({
    ...category,
    count: products.filter(product => product.categoryId === category.categoryId).length,
  }));

  // Calcular conteo de productos por talla
  const sizeCounts = {};
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  availableSizes.forEach(size => {
    sizeCounts[size] = products.filter(product => product.size === size).length;
  });

  // Calcular conteo de productos por disponibilidad
  const availabilityCounts = {
    'Disponible': products.filter(product => product.active === true).length,
    'Sin Disponibilidad': products.filter(product => product.active === false).length
  };

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
                  <input 
                    type="checkbox" 
                    value={category.categoryId} 
                    checked={selectedCategories.includes(category.categoryId)} 
                    onChange={() => onSelectCategory(category.categoryId)} 
                  />
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
            {availableSizes.map(size => (
              <li key={size} className={styles.filterItem}>
                <label>
                  <input 
                    type="checkbox" 
                    value={size} 
                    checked={selectedSizes.includes(size)}
                    onChange={() => onSelectSize(size)}
                  />
                  {size} <span className={styles.filterCount}>({sizeCounts[size] || 0})</span>
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
            {Object.keys(availabilityCounts).map(availability => (
              <li key={availability} className={styles.filterItem}>
                <label>
                  <input 
                    type="checkbox" 
                    value={availability}
                    checked={selectedAvailability.includes(availability)}
                    onChange={() => onSelectAvailability(availability)}
                  />
                  {availability} <span className={styles.filterCount}>({availabilityCounts[availability]})</span>
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