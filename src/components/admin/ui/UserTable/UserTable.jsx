import { useState, useEffect } from "react";
import {
    fetchAdminUsers,
    deleteUser,
    editUser,
    registerUser,
} from "../../../../services/adminApi";
import ProductFormModal from "../ProductFormModal/ProductFormModal";   //UserFormModal
import styles from "./UserTable.module.css";

const UserTable = () => {
  // ... (el mismo estado y lógica anterior)
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Si es null, se agregará un nuevo usuario

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const fetchedUsers = await fetchAdminUsers();
        setProducts(fetchedProducts);
    };

  const handleAdd = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (!confirmDelete) return;
    await deleteUser(userId);
    setProducts((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleSave = async (userData) => {
    if (currentUser) {
      // Modo edición
      const updatedUser = await editUser({ ...currentUser, ...userData });
      setUsers((prev) => prev.map((usr) => (usr.id === updatedUser.id ? updatedUser : usr)));
    } else {
      // Modo agregar
      const newUser = await registerUser(userData);
      setUsers((prev) => [...prev, newUser]);
    }
    setShowModal(false);
    setCurrentUser(null);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Usuarios</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          Nuevo Usuario
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo electrónico</th>
              <th>Administrador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((user) => (
              <tr key={user.id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Nombre">{user.name}</td>
                <td data-label="Apellido">{user.lastname}</td>
                <td data-label="Correo electrónico">#{user.mailId}</td>
                <td data-label="Administrador">${user.adminx}</td>
                <td data-label="Acciones" className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditClick(user)}
                    aria-label="Editar">
                      <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.delete}`}
                    onClick={() => handleDelete(user.id)}
                    aria-label="Eliminar">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductFormModal   //    UserFormModadl
          initialData={currentUser}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setCurrentUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
