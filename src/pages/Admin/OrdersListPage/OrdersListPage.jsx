import OrderTable from '../../../components/admin/ui/OrderTable/OrderTable';
import styles from './OrderListPage.module.css'; // Importa el archivo de estilos

const OrdersListPage = () => {
  return (
    <div className={styles.ordersPageContainer}>
      <h1 className={styles.title}>Lista de Pedidos</h1>
      <OrderTable />
    </div>
  );
};

export default OrdersListPage;
