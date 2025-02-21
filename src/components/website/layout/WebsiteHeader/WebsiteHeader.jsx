import { Link } from 'react-router-dom';
import styles from './WebsiteHeader.module.css';
import logoImage from '../../../../assets/logoDresscode.webp';

const WebsiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Bloque izquierdo: logotipo y lema */}
        <div className={styles.leftBlock}>
          <Link to="/" className={styles.logoLink}>
          <img src={logoImage} alt="" />
            <h1 className={styles.logo}>Dresscode</h1>
            <span className={styles.slogan}>Tu moda, tu estilo</span>
          </Link>
        </div>
        {/* Bloque derecho: botones de "Crear cuenta" e "Iniciar sesión" */}
        <div className={styles.rightBlock}>
          <button className={styles.button}>Crear cuenta</button>
          <button className={styles.button}>Iniciar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default WebsiteHeader;