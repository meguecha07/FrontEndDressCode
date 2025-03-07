import { useState, useEffect } from 'react';
import styles from './UserFormModal.module.css';

const UserFormModal = ({ initialData, onSave, onClose }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',
        id: null
    });

    useEffect(() => {
        if (initialData) {
            setUser({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                email: initialData.email || '',
                password: '', // Se deja la contraseña vacía en edición inicialmente
                role: initialData.role || 'USER',
                id: initialData.id
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password, // Se envía la contraseña (puede estar vacía si no se cambió)
            role: user.role
        };
        onSave(formattedUser);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className={styles.scrollContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>
                                <span>Nombre</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Apellido</span>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                    disabled={!!initialData}
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Contraseña</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className={styles.input}
                                    // No es requerido en edición, pero si en creación
                                />
                                <p className={styles.passwordHelper}>
                                    {initialData ? "Dejar en blanco para mantener la contraseña actual." : "Contraseña requerida para nuevos usuarios."}
                                </p>
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Rol</span>
                                <select
                                    name="role"
                                    value={user.role}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                >
                                    <option value="USER">Usuario</option>
                                    <option value="ADMIN">Administrador</option>
                                </select>
                            </label>
                        </div>


                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelButton} onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className={styles.submitButton}>
                                {initialData ? 'Guardar Cambios' : 'Crear Usuario'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserFormModal;