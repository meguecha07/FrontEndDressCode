// services/ordersData.js

// Lista inicial de pedidos
let orders = [
  {
    "id": 101,
    "client": {
      "id": 123,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "startDate": "2024-03-15",
    "endDate": "2024-03-22",
    "items": [
      {
        "clothingItem": {
          "id": 1,
          "name": "Vestido de Noche",
          "color": "negro",
          "rentalPrice": 59.99
        },
        "size": "M",
        "quantity": 1
      },
      {
        "clothingItem": {
          "id": 3,
          "name": "Traje de Caballero",
          "color": "gris",
          "rentalPrice": 89.99
        },
        "size": "L",
        "quantity": 2
      }
    ],
    "total": 239.96,
    "status": "pendiente"
  },
  {
    "id": 102,
    "client": {
      "id": 456,
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
    },
    "startDate": "2024-04-01",
    "endDate": "2024-04-08",
    "items": [
      {
        "clothingItem": {
          "id": 2,
          "name": "Vestido de Fiesta",
          "color": "rojo",
          "rentalPrice": 79.99
        },
        "size": "S",
        "quantity": 1
      }
    ],
    "total": 79.99,
    "status": "en curso"
  },
  {
    "id": 103,
    "client": {
      "id": 789,
      "name": "Peter Jones",
      "email": "peter.jones@example.com"
    },
    "startDate": "2024-05-10",
    "endDate": "2024-05-17",
    "items": [
      {
        "clothingItem": {
          "id": 4,
          "name": "Chaqueta de Cuero",
          "color": "marrón",
          "rentalPrice": 69.99
        },
        "size": "M",
        "quantity": 1
      },
      {
        "clothingItem": {
          "id": 5,
          "name": "Pantalones Vaqueros",
          "color": "azul",
          "rentalPrice": 39.99
        },
        "size": "L",
        "quantity": 1
      }
    ],
    "total": 109.98,
    "status": "completado"
  },
  {
    "id": 104,
    "client": {
      "id": 1011,
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com"
    },
    "startDate": "2024-06-01",
    "endDate": "2024-06-08",
    "items": [
      {
        "clothingItem": {
          "id": 6,
          "name": "Falda Larga",
          "color": "verde",
          "rentalPrice": 49.99
        },
        "size": "S",
        "quantity": 2
      }
    ],
    "total": 99.98,
    "status": "devuelto"
  },
  {
    "id": 105,
    "client": {
      "id": 1213,
      "name": "Bob Williams",
      "email": "bob.williams@example.com"
    },
    "startDate": "2024-07-15",
    "endDate": "2024-07-22",
    "items": [
      {
        "clothingItem": {
          "id": 7,
          "name": "Camisa de Lino",
          "color": "blanco",
          "rentalPrice": 29.99
        },
        "size": "M",
        "quantity": 3
      }
    ],
    "total": 89.97,
    "status": "pendiente"
  }
];

// Función para simular un retardo
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Obtener todos los pedidos
export const getOrders = async () => {
  await delay(1000);
  return [...orders];
};

// Agregar un nuevo pedido (opcional)
export const addOrder = async (order) => {
  await delay(1000);
  const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  const orderToAdd = { ...order, id: newId };
  orders.push(orderToAdd);
  return orderToAdd;
};

// Actualizar un pedido (opcional)
export const updateOrder = async (updatedOrder) => {
  await delay(1000);
  const index = orders.findIndex(o => o.id === updatedOrder.id);
  if (index !== -1) {
    orders[index] = { ...updatedOrder };
    return orders[index];
  }
  return null;
};

// Eliminar un pedido por ID (opcional)
export const deleteOrderById = async (id) => {
  await delay(1000);
  orders = orders.filter(o => o.id !== id);
  return { id, deleted: true };
};
