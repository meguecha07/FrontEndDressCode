import { useState, useEffect } from "react";
import {
    fetchAdminProducts,
    deleteProduct,
    updateProduct, // Importa updateProduct (renombrado de editProduct)
    registerProduct,
} from "../../../../services/adminApi";
import ProductFormModal from "../ProductFormModal/ProductFormModal";
import styles from "./ProductTable.module.css";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const fetchedProducts = await fetchAdminProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error cargando productos:", error);
            // Aquí podrías agregar un manejo de error visual para el usuario,
            // como mostrar un mensaje en la interfaz.
        }
    };

    const handleAdd = () => {
        setCurrentProduct(null);
        setShowModal(true);
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
        if (!confirmDelete) return;
        try {
            await deleteProduct(productId);
            setProducts((prev) => prev.filter((product) => product.clotheId !== productId));
        } catch (error) {
            console.error("Error eliminando producto:", error);
            // Manejo de error para la eliminación, si es necesario
        }
    };

    const handleSave = async (productData) => {
        try {
            if (currentProduct) {
                // Modo edición
                const updatedProduct = await updateProduct({ // Usa updateProduct aquí
                    clotheId: currentProduct.clotheId, // Incluye clotheId para la petición PUT
                    ...productData // Pasa el resto de la data del producto
                });
                setProducts((prev) =>
                    prev.map((prod) => (prod.clotheId === updatedProduct.clotheId ? updatedProduct : prod))
                );
            } else {
                // Modo agregar
                const newProduct = await registerProduct(productData);
                setProducts((prev) => [...prev, newProduct]);
            }
            setShowModal(false);
            setCurrentProduct(null);
            loadProducts(); // Recarga la lista de productos para reflejar los cambios
        } catch (error) {
            console.error("Error guardando producto:", error);
            // Manejo de error al guardar/editar producto, si es necesario
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de Productos</h1>
                <button className={styles.addButton} onClick={handleAdd}>
                    Nuevo Producto
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Color</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.clotheId}>
                                <td data-label="ID">{product.clotheId}</td>
                                <td data-label="Nombre">{product.name}</td>
                                <td data-label="Color">
                                    <span
                                        className={styles.colorBadge}
                                        style={{ backgroundColor: product.color?.colorName || "transparent" }}
                                    />
                                    {product.color?.colorName || "Sin color"}
                                </td>
                                <td data-label="Categoría">{product.category?.categoryName || "Sin categoría"}</td>
                                <td data-label="Precio">${product.price}</td>
                                <td data-label="Acciones" className={styles.actions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEditClick(product)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.delete}`}
                                        onClick={() => handleDelete(product.clotheId)}
                                        aria-label="Eliminar"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <ProductFormModal
                    initialData={currentProduct}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentProduct(null);
                    }}
                />
            )}
        </div>
    );
};

export default ProductTable;