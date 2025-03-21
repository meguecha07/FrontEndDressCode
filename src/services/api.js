const API_URL = "https://terrific-light-production.up.railway.app";

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/category`, {

  });
  if (!response.ok) throw new Error('Error obteniendo categorías');
  return await response.json();
};

export const fetchColors = async () => {
  const response = await fetch(`${API_URL}/color`, {

  });
  if (!response.ok) throw new Error('Error obteniendo colores');
  return await response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/clothe`, {

  });
  if (!response.ok) throw new Error('Error obteniendo productos');
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/clothe/${id}`, {

  });
  if (!response.ok) throw new Error('Error obteniendo producto');
  return await response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API_URL}/clothe/search?name=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Error en la búsqueda');
  return await response.json();
};