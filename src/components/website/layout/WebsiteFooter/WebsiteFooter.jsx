import styles from "./WebsiteFooter.module.css";
import logo from "../../../../assets/logoDresscode.webp";
import { Link } from "react-router-dom";
export const WebsiteFooter = () => {
  return (
    <footer className={styles.footerPage}>
        <article className={styles.logo}>
            <Link className={styles.linkFoooter} to="/">
                <img className={styles.imgLogo} src={logo} alt="logo"/>
                <span className={styles.fraseLogo}>Tu moda tu estilo</span>
            </Link>
        </article>
        <article className={styles.fCopy}>
            <span className={styles.tCopy}>© Grupo 5 DH 2025</span>
        </article>
        <article className={styles.redes}>
            <a className={styles.contenedorLogoRed}><i className="fa-solid fa-envelope"></i></a>
            <a className={styles.contenedorLogoRed}><i className="fa-brands fa-facebook"></i></a>
            <a className={styles.contenedorLogoRed}><i className="fa-brands fa-instagram"></i></a>
            <a className={styles.contenedorLogoRed}><i className="fa-brands fa-x-twitter"></i></a>
        </article>
    </footer>
  )
}

export default WebsiteFooter;