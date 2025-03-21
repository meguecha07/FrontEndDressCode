import { useAuth } from "../../../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const getInitials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className={styles.userMenu}>
      <div className={styles.avatar} onClick={() => setMenuOpen(!menuOpen)}>
        {getInitials(user.firstName, user.lastName)}
      </div>

      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <p>¡Hola, {user.firstName}!</p>
          <ul>
            <li onClick={() => navigate('/my-reservations')}>
              <i className="fa-solid fa-calendar-days"></i> Mis Reservas
            </li>
            
            <li onClick={() => navigate('/favorites')}>
              <i className="fa-solid fa-heart"></i> Mis Favoritos
            </li>
            
            <li onClick={() => navigate('/cart')}>
              <i className="fa-solid fa-cart-shopping"></i> Carrito
            </li>

            {user.role === "ROLE_ADMIN" && (
              <>
                <li onClick={() => navigate('/administrador/dashboard')}>
                  <i className="fa-solid fa-gear"></i> Panel Admin
                </li>
                <li onClick={() => navigate('/')}>
                  <i className="fa-solid fa-home"></i> Ir al Inicio
                </li>
              </>
            )}

            <li onClick={logout} className={styles.logout}>
              <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;