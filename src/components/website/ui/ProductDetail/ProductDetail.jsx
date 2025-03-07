import styles from "./ProductDetail.module.css";
import icon from "../../../../assets/vestido.png";
import icon1 from "../../../../assets/codigo-de-vestimenta.png";

const ProductDetail = ({ product }) => {
    // Mock data para los atributos que no están en el objeto `product`
    const mockData = {
        tipoDePrenda: "Vestido",
        talla: "M",
        material: "Algodón",
        estado: "Nuevo",
        estilo: "Casual",
        temporada: "Verano",
        ocasion: "Fiesta",
        marcaDiseñador: "Zara",
        patron: "Estampado",
        largo: "Corto",
        ajuste: "Entallado",
        genero: "Femenino",
    };

    // Combinar los datos del producto con el mock data
    const productDetails = {
        ...mockData,
        color: product.color,
        price: product.price,
    };

    return (
        <div>
            <h2>Características</h2>
            <div className={styles.details}>
                <div className={styles.list}>
                    {/* Mostrar todos los atributos */}
                    <div className={styles.attribute}>
                        <img src={icon} alt="vestido" />
                        <p>
                            <strong>Tipo de prenda:</strong> {productDetails.tipoDePrenda}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-arrow-up-1-9"></i>
                        <p>
                            <strong>Talla:</strong> {productDetails.talla}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-shirt"></i>
                        <p>
                            <strong>Color:</strong> {productDetails.color}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-brands fa-cotton-bureau"></i>
                        <p>
                            <strong>Material:</strong> {productDetails.material}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-brands fa-neos"></i>
                        <p>
                            <strong>Estado:</strong> {productDetails.estado}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-vest-patches"></i>
                        <p>
                            <strong>Estilo:</strong> {productDetails.estilo}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-sun"></i>
                        <p>
                            <strong>Temporada:</strong> {productDetails.temporada}
                        </p>
                    </div>
                </div>
                <div className={styles.list}>
                    <div className={styles.attribute}>
                        <img src={icon1} alt="ocasión" />
                        <p>
                            <strong>Ocasión:</strong> {productDetails.ocasion}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-regular fa-chess-queen"></i>
                        <p>
                            <strong>Marca/Diseñador:</strong> {productDetails.marcaDiseñador}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-shapes"></i>
                        <p>
                            <strong>Patrón:</strong> {productDetails.patron}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-arrows-turn-right"></i>
                        <p>
                            <strong>Largo:</strong> {productDetails.largo}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-solid fa-arrows-left-right-to-line"></i>   
                        <p>
                            <strong>Ajuste:</strong> {productDetails.ajuste}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <i class="fa-regular fa-circle-check"></i>
                        <p>
                            <strong>Género:</strong> {productDetails.genero}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
