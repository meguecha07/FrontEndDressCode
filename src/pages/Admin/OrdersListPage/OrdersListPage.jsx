import OrderTable from '../../../components/admin/ui/OrderTable/OrderTable';
import styles from './OrderListPage.module.css'; // Importa el archivo de estilos

const OrdersListPage = () => {
  return (
    <div className={styles.ordersPageContainer}>
      <OrderTable />
    </div>
  );
};

export default OrdersListPage;
