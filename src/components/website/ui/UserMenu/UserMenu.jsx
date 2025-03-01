import { useGlobal } from "../../../../context/GlobalContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importamos useNavigate
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const { user, logout } = useGlobal();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // 👈 Hook para redirigir

  if (!user) return null; // No mostrar el menú si no hay usuario autenticado

  // Obtener iniciales del nombre y apellido
  const getInitials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className={styles.userMenu}>
      {/* Avatar con iniciales */}
      <div className={styles.avatar} onClick={() => setMenuOpen(!menuOpen)}>
        {getInitials(user.firstName, user.lastName)}
      </div>

      {/* Modal con opciones */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <p>¡Hola, {user.firstName}!</p>
          <ul>
            <li><i class="fa-solid fa-user"></i> Información personal</li>
            {user.role !== "admin" && <li><i class="fa-solid fa-calendar"></i> Mis reservas</li>}
            
            {user.role === "admin" && (
              <li onClick={() => navigate("/admin/dashboard")}><i class="fa-solid fa-gear"></i> Panel de administración
              </li>
            )}
            {user.role === "admin" && (
              <li onClick={() => navigate("/")}><i class="fa-solid fa-home"></i> Ir a home
              </li>
            )}
            <li onClick={logout} className={styles.logout}><i class="fa-solid fa-right-from-bracket"></i> Cerrar sesión</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
