import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../../services/api';
import styles from './ProductListPage.module.css';
import Header from '../../../components/website/layout/WebsiteHeader/WebsiteHeader';
import Footer from '../../../components/website/layout/WebsiteFooter/WebsiteFooter';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    
  
    
  <div className={styles.homePage}>
    <Header />
  <div className={styles.topSection}>
  </div>

  <div className={styles.homePageContainer}>

    <main className={styles.mainContent}>
      <h3>LISTA DE PRODUCTOS</h3>
      <div className={styles.searchContainer}> {/* Sección de búsqueda */}
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" />

          <label htmlFor="categoria">Categoría:</label>
          <input type="text" id="categoria" />

          <label htmlFor="stock">Stock:</label>
          <input type="number" id="stock" />

          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" />

          <button>BUSCAR</button>
          <p>Total: {products.length} Productos</p> {/* Muestra la cantidad de productos */}
      </div>
      <table className={styles.productList}>
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Stock</th>
                  <th>Acciones</th> {/* Columna de acciones */}
              </tr>
          </thead>
          <tbody>
              {products.map((product) => (
                  <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td className={styles.actions}> {/* Contenedor para los botones */}
                          <button className={styles.edit}>Editar</button>
                          <button className={styles.delete}>Eliminar</button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
    </main>
  </div>
  <Footer />
</div>

);
};

export default ProductListPage;