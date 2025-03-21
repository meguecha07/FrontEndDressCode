const API_URL = "http://localhost:8080";

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/category`, {});
  if (!response.ok) throw new Error("Error obteniendo categorías");
  return await response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/clothe`, {});
  if (!response.ok) throw new Error("Error obteniendo productos");
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/clothe/${id}`, {});
  if (!response.ok) throw new Error("Error obteniendo producto");
  return await response.json();
};

export const toggleFavorite = async (id, isFavorite) => {
  const response = await fetch(`${API_URL}/favorite/${id}`, {
    method: "PUT", // Usar el método PUT
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isFavorite }),
  });

  if (!response.ok) {
    throw new Error("Error actualizando el favorito");
  }

  return await response.json();
};
