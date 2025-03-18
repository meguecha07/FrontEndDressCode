import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductFormModal from '../../../components/admin/ui/ProductFormModal/ProductFormModal';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [showProductModal, setShowProductModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <i className="fas fa-box"></i>
            <div>
              <span className={styles.statNumber}>152</span>
              <span className={styles.statLabel}>Productos</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <i className="fas fa-shopping-bag"></i>
            <div>
              <span className={styles.statNumber}>89</span>
              <span className={styles.statLabel}>Pedidos Activos</span>
            </div>
          </div>
          <div className={styles.statItem}>
            <i className="fa-solid fa-user"></i>
            <div>
              <span className={styles.statNumber}>89</span>
              <span className={styles.statLabel}>Usuarios</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <Link to="/administrador/products" className={styles.card}>
          <i className="fas fa-box"></i>
          <h3>Gestión de Productos</h3>
          <p>Administra tu catálogo de productos</p>
          <span className={styles.cardLink}>Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>

        <Link to="/administrador/orders" className={styles.card}>
          <i className="fas fa-shopping-bag"></i>
          <h3>Gestión de Pedidos</h3>
          <p>Revisa y gestiona los pedidos</p>
          <span className={styles.cardLink}>Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>

        <Link to="/administrador/users" className={styles.card}>
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Usuarios</h3>
          <p>Revisa y gestiona los usuarios</p>
          <span className={styles.cardLink}>Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>

        <Link to="/administrador/categories" className={styles.card}>
          <i className="fa-solid fa-tags"></i>
          <h3>Gestión de Categorías</h3>
          <p>Revisa y gestiona las categorías</p>
          <span className={styles.cardLink}>Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>

        <Link to="/administrador/attributes" className={styles.card}>
          <i className="fa-solid fa-sliders"></i>
          <h3>Gestión de Características</h3>
          <p>Revisa y gestiona las características</p>
          <span className={styles.cardLink}>Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>
      </div>
{/* 
      <button 
        className={styles.fab} 
        onClick={() => setShowProductModal(true)}
        aria-label="Añadir producto"
      >
        <i className="fas fa-plus"></i>
      </button> */}

      {showProductModal && (
        <ProductFormModal 
          onSave={() => {
            setShowProductModal(false);
            // Aquí puedes agregar lógica para actualizar la lista de productos
          }} 
          onClose={() => setShowProductModal(false)} 
        />
      )}
    </div>
  );
};

export default DashboardPage;