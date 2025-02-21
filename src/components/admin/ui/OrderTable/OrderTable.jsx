import { useState, useEffect } from 'react';
import { fetchOrders } from '../../../../services/adminApi';
import styles from './OrderTable.module.css';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    loadOrders();
  }, []);

  const handleRowClick = (orderId) => (e) => {
    if (!e.target.closest('button')) {
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pendiente': return '#6c5ce7';
      case 'en curso': return '#2d98da';
      case 'completado': return '#20bf6b';
      case 'devuelto': return '#a5b1c2';
      default: return '#d1d8e0';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gestión de Pedidos</h2>
        <button className={styles.newOrderButton}>
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fechas</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <>
                <tr 
                  key={order.id} 
                  className={styles.mainRow}
                  onClick={handleRowClick(order.id)}
                >
                  <td data-label="ID">#{order.id}</td>
                  <td data-label="Cliente">{order.client.name}</td>
                  <td data-label="Fechas">
                    <div className={styles.dateGroup}>
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(order.startDate).toLocaleDateString()} - 
                      {new Date(order.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td data-label="Items">{order.items.length} artículos</td>
                  <td data-label="Total">${order.total.toFixed(2)}</td>
                  <td data-label="Estado">
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td data-label="Acciones" className={styles.actions}>
                    <button className={styles.actionButton}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className={styles.actionButton}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>

                {expandedOrder === order.id && (
                  <tr className={styles.detailsRow}>
                    <td colSpan="7">
                      <div className={styles.orderDetails}>
                        <div className={styles.detailSection}>
                          <h4><i className="fas fa-user"></i> Información del Cliente</h4>
                          <p>{order.client.email}</p>
                        </div>
                        
                        <div className={styles.detailSection}>
                          <h4><i className="fas fa-calendar-week"></i> Periodo de Alquiler</h4>
                          <p>
                            {new Date(order.startDate).toLocaleDateString()} - 
                            {new Date(order.endDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className={styles.detailSection}>
                          <h4><i className="fas fa-tshirt"></i> Artículos ({order.items.length})</h4>
                          <div className={styles.itemsGrid}>
                            {order.items.map((item, index) => (
                              <div key={index} className={styles.itemCard}>
                                <div className={styles.itemHeader}>
                                  <span className={styles.itemName}>{item.clothingItem.name}</span>
                                  <span className={styles.itemPrice}>${item.clothingItem.rentalPrice}/día</span>
                                </div>
                                <div className={styles.itemDetails}>
                                  <span>Talla: {item.size}</span>
                                  <span>Cantidad: {item.quantity}</span>
                                  <span>Color: <div className={styles.colorDot} style={{ backgroundColor: item.clothingItem.color }} /></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;