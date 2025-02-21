import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../../../services/api'; // Ajusta la ruta si es necesario
import styles from './WebsiteSidebar.module.css';

const WebsiteSidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => { // Recibe props para control desde HomePage
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  const handleToggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleToggleSize = () => {
    setIsSizeOpen(!isSizeOpen);
  };

  const handleToggleAvailability = () => {
    setIsAvailabilityOpen(!isAvailabilityOpen);
  };

  return (
    <aside className={`${styles.sidebar} ${isMobileSidebarOpen ? styles.open : ''}`}> {/* Clase condicional para abrir en móvil */}
      <div className={styles.filterSection}>
        <div className={styles.filterHeader} onClick={handleToggleCategory}>
          Categoría
          <span className={styles.arrow}>{isCategoryOpen ? '▲' : '▼'}</span>
        </div>
        {isCategoryOpen && (
          <ul className={styles.filterList}>
            {categories.map((category,index) => (
              <li key={index} className={styles.filterItem}>
                <label>
                  <input type="checkbox" value={category} />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterHeader} onClick={handleToggleSize}>
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
        <div className={styles.filterHeader} onClick={handleToggleAvailability}>
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
      <button className={styles.closeButton} onClick={toggleMobileSidebar}>Cerrar Filtros</button> {/* Botón para cerrar en móvil */}
    </aside>
  );
};

export default WebsiteSidebar;