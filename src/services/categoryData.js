// services/categoryData.js

// Lista inicial de categorías
let categories = [
  { id: 1, name: 'Vestidos', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 2, name: 'Trajes', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 3, name: 'Casual', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 4, name: 'Fiesta', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 5, name: 'Pantalones', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 6, name: 'Camisas', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 7, name: 'Faldas', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 8, name: 'Zapatos', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
  { id: 9, name: 'Accesorios', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
];

// Función para simular un retardo
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Obtener todas las categorías
export const getCategories = async () => {
  await delay(1000);
  return [...categories];
};

// Agregar una nueva categoría
export const addCategory = async (newCategory) => {
  await delay(1000);
  const newId = categories.length ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
  const categoryToAdd = { ...newCategory, id: newId };
  categories.push(categoryToAdd);
  return categoryToAdd;
};

// Actualizar una categoría existente
export const updateCategory = async (updatedCategory) => {
  await delay(1000);
  const index = categories.findIndex(cat => cat.id === updatedCategory.id);
  if (index !== -1) {
    categories[index] = { ...updatedCategory };
    return categories[index];
  }
  return null;
};

// Eliminar una categoría por ID
export const deleteCategoryById = async (id) => {
  await delay(1000);
  categories = categories.filter(cat => cat.id !== id);
  return { id, deleted: true };
};
