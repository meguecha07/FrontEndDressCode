import { useGlobal } from "../../../../context/GlobalContext.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../../ui/UserMenu/UserMenu.jsx"; // Asegúrate de que el componente existe
import styles from "./WebsiteHeader.module.css";
import logoImage from "../../../../assets/logoDresscode.webp";

const WebsiteHeader = () => {
  const { user, login } = useGlobal();
  const [menuOpen, setMenuOpen] = useState(false);

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
              <button className={styles.button}>Crear cuenta</button>
              <button className={styles.button} onClick={login}>Iniciar sesión</button>
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
