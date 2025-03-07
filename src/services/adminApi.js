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

export const updateProduct = async (productData) => {
  const response = await fetch(`${API_URL}/clothe/${productData.clotheId}`, {
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
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Error registrando usuario');
  return await response.json();
};

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


// ==================== CATEGORÍAS ====================
export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_URL}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) throw new Error('Error al crear la categoría');
  return await response.json();
};

export const updateCategory = async (categoryData) => {
  const response = await fetch(`${API_URL}/category`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(categoryData)
  });
  if (!response.ok) throw new Error('Error actualizando categoría');
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/category`, {
  });
  if (!response.ok) throw new Error('Error obteniendo categorías');
  return await response.json();
};

export const fetchCategoryById = async (categoryId) => {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo categoría');
  return await response.json();
};

export const deleteCategory = async (categoryId) => {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando categoría');
  return true;
};

// ==================== COLORES ====================
export const createColor = async (colorData) => {
  const response = await fetch(`${API_URL}/color`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(colorData)
  });
  if (!response.ok) throw new Error('Error al crear el color');
  return await response.json();
};

export const updateColor = async (colorData) => {
  const response = await fetch(`${API_URL}/color`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(colorData)
  });
  if (!response.ok) throw new Error('Error actualizando color');
  return await response.json();
};

export const fetchColors = async () => {
  const response = await fetch(`${API_URL}/color`, {
    headers: { "Content-Type": "application/json",
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo colores');
  return await response.json();
};

export const fetchColorById = async (colorId) => {
  const response = await fetch(`${API_URL}/color/${colorId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo color');
  return await response.json();
};

export const deleteColor = async (colorId) => {
  const response = await fetch(`${API_URL}/color/${colorId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando color');
  return true;
};

// ==================== IMÁGENES ====================
export const createImage = async (imageData) => {
  const response = await fetch(`${API_URL}/imagen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(imageData)
  });
  if (!response.ok) throw new Error('Error al crear la imagen');
  return await response.json();
};

export const updateImage = async (imageData) => {
  const response = await fetch(`${API_URL}/imagen`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(imageData)
  });
  if (!response.ok) throw new Error('Error actualizando imagen');
  return await response.json();
};

export const fetchImages = async () => {
  const response = await fetch(`${API_URL}/imagen`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo imágenes');
  return await response.json();
};

export const fetchImageById = async (imageId) => {
  const response = await fetch(`${API_URL}/imagen/${imageId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo imagen');
  return await response.json();
};

export const deleteImage = async (imageId) => {
  const response = await fetch(`${API_URL}/imagen/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando imagen');
  return true;
};