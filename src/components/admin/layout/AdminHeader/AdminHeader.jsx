import { Link } from 'react-router-dom';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/administrador/dashboard" className={styles.logo}>
          <span>Admin Dresscode</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/administrador/products" className={styles.navLink}>
            <i className="fas fa-box"></i>
            Productos
          </Link>
          <Link to="/administrador/orders" className={styles.navLink}>
            <i className="fas fa-shopping-bag"></i>
            Pedidos
          </Link>
        </nav>

        <div className={styles.user}>
          <div className={styles.avatar}>
            <i className="fas fa-user-circle"></i>
          </div>
          <span className={styles.userName}>admin@example.com</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;