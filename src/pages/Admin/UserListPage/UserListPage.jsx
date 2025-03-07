import UserTable from '../../../components/admin/ui/UserTable/UserTable';
import styles from './UserListPage.module.css'; // Importa el archivo de estilos para UsersListPage

const UsersListPage = () => {
    return (
        <div className={styles.usersPageContainer}> {/* Contenedor principal con estilos de UsersListPage */}
            <UserTable /> {/* Renderiza el componente UserTable */}
        </div>
    );
};

export default UsersListPage;