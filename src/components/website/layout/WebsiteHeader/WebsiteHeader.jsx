import { useAuth } from "../../../../context/AuthContext"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import UserMenu from "../../ui/UserMenu/UserMenu.jsx";
import styles from "./WebsiteHeader.module.css";
import logoImage from "../../../../assets/logoDresscode.webp";

const WebsiteHeader = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Hook para redireccionar

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Bloque izquierdo: logotipo y lema */}
        <div className={styles.leftBlock}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoImage} alt="Dresscode Logo" className={styles.logoImage} />
            <h1 className={styles.logo}>Dresscode</h1>
            <span className={styles.slogan}>Tu moda, tu estilo</span>
          </Link>
        </div>

        {/* Mostrar opciones según autenticación */}
        {!user ? (
          <>
            {/* Menú responsive */}
            <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
              <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </button>

            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
              <button className={styles.button} onClick={() => navigate("/register")}>Crear cuenta</button> {/* ✅ Redirigir a /register */}
              <button className={styles.button} onClick={() => navigate("/login")}>Iniciar sesión</button> {/* ✅ Redirigir a /login */}
            </nav>
          </>
        ) : (
          <UserMenu />
        )}
      </div>
    </header>
  );
};

export default WebsiteHeader;