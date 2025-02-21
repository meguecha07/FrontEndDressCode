import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css'; // Importa el archivo de estilos

const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Bienvenido al Panel de Administración</h1>
      <div className={styles.linksContainer}>
        <Link to="/admin/products" className={styles.link}>Ver Productos</Link>
        <Link to="/admin/orders" className={styles.link}>Ver Pedidos</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
