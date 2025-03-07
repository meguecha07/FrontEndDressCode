import styles from "./ProductDetail.module.css";

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
                        <img src="/icon-tipo-prenda.svg" alt="Tipo de prenda" />
                        <p>
                            <strong>Tipo de prenda:</strong> {productDetails.tipoDePrenda}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-talla.svg" alt="Talla" />
                        <p>
                            <strong>Talla:</strong> {productDetails.talla}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-color.svg" alt="Color" />
                        <p>
                            <strong>Color:</strong> {productDetails.color}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-material.svg" alt="Material" />
                        <p>
                            <strong>Material:</strong> {productDetails.material}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-estado.svg" alt="Estado" />
                        <p>
                            <strong>Estado:</strong> {productDetails.estado}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-estilo.svg" alt="Estilo" />
                        <p>
                            <strong>Estilo:</strong> {productDetails.estilo}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-temporada.svg" alt="Temporada" />
                        <p>
                            <strong>Temporada:</strong> {productDetails.temporada}
                        </p>
                    </div>
                </div>
                <div className={styles.list}>
                    <div className={styles.attribute}>
                        <img src="/icon-ocasion.svg" alt="Ocasión" />
                        <p>
                            <strong>Ocasión:</strong> {productDetails.ocasion}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-marca.svg" alt="Marca/Diseñador" />
                        <p>
                            <strong>Marca/Diseñador:</strong> {productDetails.marcaDiseñador}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-patron.svg" alt="Patrón" />
                        <p>
                            <strong>Patrón:</strong> {productDetails.patron}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-largo.svg" alt="Largo" />
                        <p>
                            <strong>Largo:</strong> {productDetails.largo}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-ajuste.svg" alt="Ajuste" />
                        <p>
                            <strong>Ajuste:</strong> {productDetails.ajuste}
                        </p>
                    </div>
                    <div className={styles.attribute}>
                        <img src="/icon-genero.svg" alt="Género" />
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
