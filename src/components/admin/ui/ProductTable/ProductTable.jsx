import { useState, useEffect } from "react";
import {
  fetchAdminProducts,
  deleteProduct,
  editProduct,
  registerProduct,
} from "../../../../services/adminApi";
import ProductFormModal from "../ProductFormModal/ProductFormModal";
import styles from "./ProductTable.module.css";

const ProductTable = () => {
  // ... (el mismo estado y lógica anterior)
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Si es null, se agregará un nuevo producto

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const fetchedProducts = await fetchAdminProducts();
    setProducts(fetchedProducts);
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
    await deleteProduct(productId);
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const handleSave = async (productData) => {
    if (currentProduct) {
      // Modo edición
      const updatedProduct = await editProduct({ ...currentProduct, ...productData });
      setProducts((prev) => prev.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod)));
    } else {
      // Modo agregar
      const newProduct = await registerProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowModal(false);
    setCurrentProduct(null);
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
              <tr key={product.id}>
                <td data-label="ID">{product.id}</td>
                <td data-label="Nombre">{product.name}</td>
                <td data-label="Color">
                  <span className={styles.colorBadge} style={{ backgroundColor: product.color }} />
                  {product.color}
                </td>
                <td data-label="Categoría">#{product.categoryId}</td>
                <td data-label="Precio">${product.price}</td>
                <td data-label="Acciones" className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditClick(product)}
                    aria-label="Editar">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  <button
                    className={`${styles.actionButton} ${styles.delete}`}
                    onClick={() => handleDelete(product.id)}
                    aria-label="Eliminar">
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
