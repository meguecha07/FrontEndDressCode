import ProductTable from '../../../components/admin/ui/ProductTable/ProductTable';
import styles from './ProductListPage.module.css'; // Importa el archivo de estilos

const ProductsListPage = () => {
  return (
    <div className={styles.productsPageContainer}>
      <h1 className={styles.title}>Lista de Productos</h1>
      <ProductTable />
    </div>
  );
};

export default ProductsListPage;
