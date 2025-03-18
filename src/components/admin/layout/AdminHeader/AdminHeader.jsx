import { Link } from 'react-router-dom';
import UserMenu from "../../../website/ui/UserMenu/UserMenu";
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
          <Link to="/administrador/users" className={styles.navLink}>
            <i className="fa-solid fa-user"></i>
            Usuarios
          </Link>
          <Link to="/administrador/categories" className={styles.navLink}>
            <i className="fa-solid fa-tags"></i>
            Categorías
          </Link>
          <Link to="/administrador/attributes" className={styles.navLink}>
            <i className="fa-solid fa-sliders"></i>
            Características
          </Link>
          {/* Avatar con menú de usuario */}
        <UserMenu />
        </nav>

         
      </div>
    </header>
  );
};

export default AdminHeader;