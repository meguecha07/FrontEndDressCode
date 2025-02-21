// services/productData.js
import imagenPrenda from "../assets/prenda.jpg";

// Lista inicial de productos (puedes incluir todos los que ya tienes definidos)
let products = [

  { id: 1, name: "Vestido de Noche", color: "black", categoryId: 1, price: 59.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Un vestido elegante y cómodo, ideal para ocasiones formales." },
  { id: 2, name: "Vestido de Cóctel", color: "black", categoryId: 1, price: 49.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 3, name: "Vestido Largo Elegante", color: "black", categoryId: 1, price: 79.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 4, name: "Vestido de Fiesta", color: "black", categoryId: 4, price: 69.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 5, name: "Vestido Corto Formal", color: "black", categoryId: 1, price: 45.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 6, name: "Traje Negro Clásico", color: "black", categoryId: 2, price: 89.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 7, name: "Traje Azul Marino", color: "blue", categoryId: 2, price: 95.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 8, name: "Esmoquin", color: "black", categoryId: 2, price: 120.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 9, name: "Camisa Blanca Formal", color: "white", categoryId: 6, price: 29.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 10, name: "Camisa Azul Claro", color: "light blue", categoryId: 6, price: 27.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 11, name: "Falda Larga Elegante", color: "black", categoryId: 7, price: 34.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 12, name: "Falda de Fiesta", color: "black", categoryId: 7, price: 39.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 13, name: "Pantalón de Vestir", color: "black", categoryId: 5, price: 49.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 14, name: "Pantalón Chino", color: "black", categoryId: 5, price: 42.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 15, name: "Pantalón Casual", color: "black", categoryId: 3, price: 39.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 16, name: "Zapatos de Charol", color: "#FFFFFF", categoryId: 8, price: 59.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 17, name: "Tacones Rojos", color: "red", categoryId: 8, price: 65.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 18, name: "Mocasines de Cuero", color: "black", categoryId: 8, price: 55.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 19, name: "Corbata de Seda", color: "black", categoryId: 9, price: 19.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 20, name: "Pajarita Negra", color: "black", categoryId: 9, price: 14.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 21, name: "Reloj de Lujo", color: "yellow", categoryId: 9, price: 99.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 22, name: "Bolso de Fiesta", color: "black", categoryId: 9, price: 45.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 23, name: "Pendientes de Perlas", color: "white", categoryId: 9, price: 29.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 24, name: "Camisa Negra Slim Fit", color: "black", categoryId: 6, price: 32.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 25, name: "Blazer Elegante", color: "black", categoryId: 2, price: 75.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 26, name: "Abrigo Largo Formal", color: "black", categoryId: 2, price: 99.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 27, name: "Vestido Vintage", color: "black", categoryId: 1, price: 52.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 28, name: "Pantalón Palazzo", color: "black", categoryId: 5, price: 47.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 29, name: "Zapatos Oxford", color: "black", categoryId: 8, price: 68.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
  { id: 30, name: "Collar de Diamantes", color: "white", categoryId: 9, price: 199.99, image: [imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda, imagenPrenda], description: "Agregar la descripcion de la prenda" },
];

// Función auxiliar para simular retardo en las llamadas asíncronas
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtener todos los productos
export const getProducts = async () => {
  await delay(1000);
  // Se devuelve una copia para evitar modificaciones directas externas
  return [...products];
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  await delay(1000);
  return products.find(product => product.id === parseInt(id));
};

// Agregar un nuevo producto
export const addProduct = async (newProduct) => {
  await delay(1000);
  const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const productToAdd = { ...newProduct, id: newId };
  products.push(productToAdd);
  return productToAdd;
};

// Actualizar un producto existente
export const updateProduct = async (updatedProduct) => {
  await delay(1000);
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...updatedProduct };
    return products[index];
  }
  return null;
};

// Eliminar un producto por ID
export const deleteProductById = async (id) => {
  await delay(1000);
  products = products.filter(product => product.id !== id);
  return { id, deleted: true };
};


