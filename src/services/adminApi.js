// services/adminApi.js
import { addProduct, getProducts, updateProduct, deleteProductById } from "./productData";
import { getOrders } from "./ordersData";

// Registro de un nuevo producto
export const registerProduct = async (product) => {
  return await addProduct(product);
};

// Obtiene la lista de productos para el admin
export const fetchAdminProducts = async () => {
  return await getProducts();
};

// Edita un producto existente
export const editProduct = async (product) => {
  return await updateProduct(product);
};

// Elimina un producto por ID
export const deleteProduct = async (productId) => {
  return await deleteProductById(productId);
};

// Obtiene la lista de pedidos utilizando ordersData.js
export const fetchOrders = async () => {
  return await getOrders();
};
