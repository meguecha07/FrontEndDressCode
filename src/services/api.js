import imagenPrenda from "../assets/prenda.jpg"

// Simulación de llamada API para obtener categorías
export const fetchCategories = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, name: 'Vestidos', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 2, name: 'Trajes', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 3, name: 'Casual', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 4, name: 'Fiesta', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 5, name: 'Pantalones', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 6, name: 'Camisas', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 7, name: 'Faldas', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 8, name: 'Zapatos', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { id: 9, name: 'Accesorios', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' }
    ]), 1000)
  );
};

// Simulación de llamada API para obtener productos
export const fetchProducts = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve([

      { id: 1, name: "Vestido de Noche", color:"black", categoryId: 1, price: 59.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Un vestido elegante y cómodo, ideal para ocasiones formales." },
      { id: 2, name: "Vestido de Cóctel", color:"black", categoryId: 1, price: 49.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda"},
      { id: 3, name: "Vestido Largo Elegante", color:"black", categoryId: 1, price: 79.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 4, name: "Vestido de Fiesta", color:"black", categoryId: 4, price: 69.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 5, name: "Vestido Corto Formal", color:"black", categoryId: 1, price: 45.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 6, name: "Traje Negro Clásico", color:"black", categoryId: 2, price: 89.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 7, name: "Traje Azul Marino", color:"blue", categoryId: 2, price: 95.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 8, name: "Esmoquin", color:"black", categoryId: 2, price: 120.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 9, name: "Camisa Blanca Formal", color:"white", categoryId: 6, price: 29.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 10, name: "Camisa Azul Claro", color:"light blue", categoryId: 6, price: 27.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 11, name: "Falda Larga Elegante", color:"black", categoryId: 7, price: 34.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 12, name: "Falda de Fiesta", color:"black", categoryId: 7, price: 39.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 13, name: "Pantalón de Vestir", color:"black", categoryId: 5, price: 49.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 14, name: "Pantalón Chino", color:"black", categoryId: 5, price: 42.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 15, name: "Pantalón Casual", color:"black", categoryId: 3, price: 39.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 16, name: "Zapatos de Charol", color:"#FFFFFF", categoryId: 8, price: 59.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 17, name: "Tacones Rojos", color:"red", categoryId: 8, price: 65.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 18, name: "Mocasines de Cuero", color:"black", categoryId: 8, price: 55.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 19, name: "Corbata de Seda", color:"black", categoryId: 9, price: 19.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 20, name: "Pajarita Negra", color:"black", categoryId: 9, price: 14.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 21, name: "Reloj de Lujo", color:"yellow", categoryId: 9, price: 99.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 22, name: "Bolso de Fiesta", color:"black", categoryId: 9, price: 45.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 23, name: "Pendientes de Perlas", color:"white", categoryId: 9, price: 29.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 24, name: "Camisa Negra Slim Fit", color:"black", categoryId: 6, price: 32.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 25, name: "Blazer Elegante", color:"black", categoryId: 2, price: 75.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 26, name: "Abrigo Largo Formal", color:"black", categoryId: 2, price: 99.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 27, name: "Vestido Vintage", color:"black", categoryId: 1, price: 52.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda],description: "Agregar la descripcion de la prenda" },
      { id: 28, name: "Pantalón Palazzo", color:"black", categoryId: 5, price: 47.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 29, name: "Zapatos Oxford", color:"black", categoryId: 8, price: 68.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
      { id: 30, name: "Collar de Diamantes", color:"white", categoryId: 9, price: 199.99, image: [imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda,imagenPrenda] ,description: "Agregar la descripcion de la prenda"},
    ]), 1000)
  );
};

// Simulación de llamada API para obtener un producto por ID
export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(product => product.id === parseInt(id));
};
