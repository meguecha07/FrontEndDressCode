import { useState, useEffect } from 'react';
import { fetchOrders } from '../../../../services/adminApi';
import styles from './OrderTable.module.css';  // Importa el archivo de estilos

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    loadOrders();
  }, []);

  return (
    <div className={styles.tableContainer}> {/* Aplica el estilo de contenedor */}
      <h3>Lista de Pedidos</h3>
      <table className={styles.table}> {/* Aplica el estilo de la tabla */}
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
