const API_URL = "https://triumphant-appreciation-production.up.railway.app";

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

// ==================== RESERVAS ====================
export const createReservation = async (reservationData) => {
  const response = await fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(reservationData)
  });
  if (!response.ok) throw new Error('Error creando reserva');
  return await response.json();
};

export const getReservations = async () => {
  const response = await fetch(`${API_URL}/reservations`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo reservas');
  return await response.json();
};

export const updateReservation = async (reservationId, reservationData) => {
  const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(reservationData)
  });
  if (!response.ok) throw new Error('Error actualizando reserva');
  return await response.json();
};

export const deleteReservation = async (reservationId) => {
  const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando reserva');
  return true;
};

export const returnReservation = async (reservationId) => {
  const response = await fetch(
    `${API_URL}/reservations/${reservationId}/return`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) throw new Error("Error devolviendo reserva");
  return await response.json();
};

// ==================== REVIEW  ====================
export const createReview = async (reviewData) => {
  const response = await fetch(`${API_URL}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(reviewData)
  });
  if (!response.ok) throw new Error('Error creando review');
  return await response.json();
};

export const getAllReviews = async () => {
  const response = await fetch(`${API_URL}/review`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error devolviendo reserva');
  return await response.json();
};


// Eliminar getFavorites y mantener solo estos endpoints
export const addFavorite = async (userId, clotheId) => {
  const response = await fetch(`${API_URL}/user/${userId}/favorite/${clotheId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error añadiendo favorito');
  return await response.json();
};

export const deleteFavorite = async (userId, clotheId) => {
  const response = await fetch(`${API_URL}/user/${userId}/favorite/${clotheId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error eliminando favorito');
  return true;
};

export const getUser = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo reviews de la prenda');
  return await response.json();
};

export const getReviewsByUserId = async (userId) => {
  const response = await fetch(`${API_URL}/review/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo reviews del usuario');
  return await response.json();
};

export const getClotheRating = async (clotheId) => {
  const response = await fetch(`${API_URL}/review/clothe/${clotheId}/rating`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!response.ok) throw new Error('Error obteniendo puntuación de la prenda');
  return await response.json();
};
