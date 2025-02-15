// Simulación de llamada API para registrar un nuevo producto
export const registerProduct = async (product) => {
  return new Promise(resolve =>
    setTimeout(() => resolve({ ...product, id: Math.floor(Math.random() * 1000) }), 1000)
  );
};

// Simulación de llamada API para obtener la lista de productos
export const fetchAdminProducts = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, name: "Vestido Rojo", price: 49.99 },
      { id: 2, name: "Traje Azul", price: 89.99 },
      { id: 3, name: "Blazer Casual", price: 79.99 },
      { id: 4, name: "Camisa Formal", price: 29.99 }
    ]), 1000)
  );
};

// Simulación de llamada API para editar un producto
export const editProduct = async (product) => {
  return new Promise(resolve =>
    setTimeout(() => resolve({ ...product }), 1000)
  );
};

// Simulación de llamada API para eliminar un producto
export const deleteProduct = async (productId) => {
  return new Promise(resolve =>
    setTimeout(() => resolve({ id: productId, deleted: true }), 1000)
  );
};

// Simulación de llamada API para obtener la lista de pedidos
export const fetchOrders = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, customerName: "John Doe", total: 150.00, status: "Pendiente" },
      { id: 2, customerName: "Jane Smith", total: 200.00, status: "Completado" },
    ]), 1000)
  );
};
