import { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser, registerUser } from "../../../../services/adminApi";
import UserFormModal from "../UserFormModal/UserFormModal";
import styles from "./UserTable.module.css";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
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
        try {
            await deleteUser(userId);
            setUsers((prev) => prev.filter((user) => user.id !== userId));
            loadUsers();
        } catch (error) {
            console.error("Error eliminando usuario:", error);
        }
    };

    const handleSave = async (userData) => {
        try {
            if (currentUser) {
                const updatedUser = await updateUser(currentUser.id, userData);
                setUsers((prev) =>
                    prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
                );
            } else {
                const newUser = await registerUser(userData);
                setUsers((prev) => [...prev, newUser]);
            }
            setShowModal(false);
            setCurrentUser(null);
            loadUsers();
        } catch (error) {
            console.error("Error guardando usuario:", error);
        }
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
                            <th>Email</th>
                            <th>Rol</th> 
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td data-label="ID">{user.id}</td>
                                <td data-label="Nombre">{user.firstName}</td>
                                <td data-label="Apellido">{user.lastName}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Rol">{user.role}</td> 
                                <td data-label="Acciones" className={styles.actions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEditClick(user)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.delete}`}
                                        onClick={() => handleDelete(user.id)}
                                        aria-label="Eliminar"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <UserFormModal
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