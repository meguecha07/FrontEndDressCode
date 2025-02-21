import { useState, useEffect } from 'react';
import { fetchAdminProducts, deleteProduct, editProduct } from '../../../../services/adminApi';
import ProductFormModal from '../ProductFormModal/ProductFormModal';
import styles from './ProductTable.module.css';  // Importa el archivo de estilos

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchAdminProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
  };

  const handleEdit = async (product) => {
    await editProduct(product);
    setShowModal(false);
  };

  return (
    <div className={styles.tableContainer}> {/* Aplica el estilo de contenedor */}
      <button className={styles.addProductBtn} onClick={() => setShowModal(true)}>Agregar Producto</button> {/* Aplica el estilo del botón */}
      <table className={styles.table}> {/* Aplica el estilo de la tabla */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <ProductFormModal onSave={handleEdit} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductTable;
