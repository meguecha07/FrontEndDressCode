// services/ordersData.js

// Lista inicial de pedidos
let orders = [
  { id: 1, customerName: "John Doe", total: 150.00, status: "Pendiente" },
  { id: 2, customerName: "Jane Smith", total: 200.00, status: "Completado" }
];

// Función para simular un retardo
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Obtener todos los pedidos
export const getOrders = async () => {
  await delay(1000);
  return [...orders];
};

// Agregar un nuevo pedido (opcional)
export const addOrder = async (order) => {
  await delay(1000);
  const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  const orderToAdd = { ...order, id: newId };
  orders.push(orderToAdd);
  return orderToAdd;
};

// Actualizar un pedido (opcional)
export const updateOrder = async (updatedOrder) => {
  await delay(1000);
  const index = orders.findIndex(o => o.id === updatedOrder.id);
  if (index !== -1) {
    orders[index] = { ...updatedOrder };
    return orders[index];
  }
  return null;
};

// Eliminar un pedido por ID (opcional)
export const deleteOrderById = async (id) => {
  await delay(1000);
  orders = orders.filter(o => o.id !== id);
  return { id, deleted: true };
};
