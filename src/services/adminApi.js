const API_URL = "http://localhost:8080";

// ==================== PRODUCTOS ====================
export const registerProduct = async (productData) => {
  const response = await fetch(`${API_URL}/clothe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(productData)
  });
  if (!response.ok) throw new Error('Error al registrar el producto');
  return await response.json();
};

export const fetchAdminProducts = async () => {
  const response = await fetch(`${API_URL}/clothe`, {
  });
  if (!response.ok) throw new Error('Error obteniendo productos');
  return await response.json();
};

export const editProduct = async (productData) => {
  const response = await fetch(`${API_URL}/clothe`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(productData)
  });
  if (!response.ok) throw new Error('Error actualizando producto');
  return await response.json();
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_URL}/clothe/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando producto');
  return true;
};

// ==================== USUARIOS ====================
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo usuarios');
  return await response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando usuario');
  return true;
};

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Error actualizando usuario');
  return await response.json();
};

// ==================== PEDIDOS ====================
// Mantenemos temporalmente los datos mock
import { getOrders } from "./ordersData";
export const fetchOrders = getOrders;