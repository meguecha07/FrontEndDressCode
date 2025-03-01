import { Link } from 'react-router-dom';
import UserMenu from "../../../website/ui/UserMenu/UserMenu";
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/admin/dashboard" className={styles.logo}>
          <span>Admin Dresscode</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/admin/products" className={styles.navLink}>
            <i className="fas fa-box"></i>
            Productos
          </Link>
          <Link to="/admin/orders" className={styles.navLink}>
            <i className="fas fa-shopping-bag"></i>
            Pedidos
          </Link>
          {/* Avatar con menú de usuario */}
        <UserMenu />
        </nav>

         
      </div>
    </header>
  );
};

export default AdminHeader;