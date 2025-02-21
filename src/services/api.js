// services/api.js
import { getProducts, getProductById } from "./productData.js";
import { getCategories } from "./categoryData.js";

// Obtiene las categorías desde categoryData.js
export const fetchCategories = async () => {
  return await getCategories();
};

export const fetchProducts = async () => {
  return await getProducts();
};

// Obtiene un producto por ID desde productData.js
export const fetchProductById = async (id) => {
  return await getProductById(id);
};
