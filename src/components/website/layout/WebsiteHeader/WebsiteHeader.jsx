import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./WebsiteHeader.module.css";
import logoImage from "../../../../assets/logoDresscode.webp";

const WebsiteHeader = () => {
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

        {/* Menú responsive */}
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <button className={styles.button}>Crear cuenta</button>
          <button className={styles.button}>Iniciar sesión</button>
        </nav>
      </div>
    </header>
  );
};

export default WebsiteHeader;