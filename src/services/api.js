// Simulación de llamada API para obtener categorías
export const fetchCategories = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { name: 'Vestidos', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Trajes', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Casual', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Fiesta', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Casual', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Fiesta', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Casual', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Fiesta', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' },
      { name: 'Accesorios', imageUrl: 'https://cdn-icons-png.flaticon.com/512/7552/7552762.png' }
    ]), 1000)
  );
};

// Simulación de llamada API para obtener productos
export const fetchProducts = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve([
      { id: 1, name: "Vestido Rojo", price: 49.99, image: "https://www.modarm.com/medias/000005000000887036-1200-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDIwODd8aW1hZ2UvanBlZ3xhREJoTDJobU1pODBOREF6TkRrd09EUTFORGswTWk4d01EQXdNRFV3TURBd01EQTRPRGN3TXpZdE1USXdNRjh4TG1wd1p3fGI1ZWEyZTA5YzcyMDAzNWY4NzI5NDYyMTlkOGJjMjQ4Y2Y0NTg5NTZmOTJhZWEyMWE1NTgyYmQ2N2NlMmI0NWU" },
      { id: 2, name: "Traje Azul", price: 89.99, image: "https://www.modarm.com/medias/000005000000887036-1200-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDIwODd8aW1hZ2UvanBlZ3xhREJoTDJobU1pODBOREF6TkRrd09EUTFORGswTWk4d01EQXdNRFV3TURBd01EQTRPRGN3TXpZdE1USXdNRjh4TG1wd1p3fGI1ZWEyZTA5YzcyMDAzNWY4NzI5NDYyMTlkOGJjMjQ4Y2Y0NTg5NTZmOTJhZWEyMWE1NTgyYmQ2N2NlMmI0NWU" },
      { id: 3, name: "Vestido Negro", price: 59.99, image: "https://www.modarm.com/medias/000005000000887036-1200-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDIwODd8aW1hZ2UvanBlZ3xhREJoTDJobU1pODBOREF6TkRrd09EUTFORGswTWk4d01EQXdNRFV3TURBd01EQTRPRGN3TXpZdE1USXdNRjh4TG1wd1p3fGI1ZWEyZTA5YzcyMDAzNWY4NzI5NDYyMTlkOGJjMjQ4Y2Y0NTg5NTZmOTJhZWEyMWE1NTgyYmQ2N2NlMmI0NWU" },
      { id: 4, name: "Blazer Casual", price: 79.99, image: "https://www.modarm.com/medias/000005000000887036-1200-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDIwODd8aW1hZ2UvanBlZ3xhREJoTDJobU1pODBOREF6TkRrd09EUTFORGswTWk4d01EQXdNRFV3TURBd01EQTRPRGN3TXpZdE1USXdNRjh4TG1wd1p3fGI1ZWEyZTA5YzcyMDAzNWY4NzI5NDYyMTlkOGJjMjQ4Y2Y0NTg5NTZmOTJhZWEyMWE1NTgyYmQ2N2NlMmI0NWU" },
      { id: 5, name: "Falda Elegante", price: 39.99, image: "https://www.modarm.com/medias/000005000000887036-1200-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDIwODd8aW1hZ2UvanBlZ3xhREJoTDJobU1pODBOREF6TkRrd09EUTFORGswTWk4d01EQXdNRFV3TURBd01EQTRPRGN3TXpZdE1USXdNRjh4TG1wd1p3fGI1ZWEyZTA5YzcyMDAzNWY4NzI5NDYyMTlkOGJjMjQ4Y2Y0NTg5NTZmOTJhZWEyMWE1NTgyYmQ2N2NlMmI0NWU" },
      { id: 6, name: "Camisa Formal", price: 29.99, image: "https://www.modarm.com/medias/000005000000887036-1200-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDIwODd8aW1hZ2UvanBlZ3xhREJoTDJobU1pODBOREF6TkRrd09EUTFORGswTWk4d01EQXdNRFV3TURBd01EQTRPRGN3TXpZdE1USXdNRjh4TG1wd1p3fGI1ZWEyZTA5YzcyMDAzNWY4NzI5NDYyMTlkOGJjMjQ4Y2Y0NTg5NTZmOTJhZWEyMWE1NTgyYmQ2N2NlMmI0NWU" },
    ]), 1000)
  );
};

// Simulación de llamada API para obtener un producto por ID
export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find(product => product.id === parseInt(id));
};
