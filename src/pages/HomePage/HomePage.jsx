import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts } from '../../services/api';
import styles from './HomePage.module.css';
import ProductCard from '../../components/website/ui/ProductCard/ProductCard';
import Pagination from '../../components/website/ui/Pagination/Pagination';
import SearchBar from '../../components/website/ui/SearchBar/SearchBar';
import CategoryList from '../../components/website/ui/CategoryList/CategoryList';
import WebsiteSidebar from '../../components/website/layout/WebsiteSidebar/WebsiteSidebar';


const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]) 
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Estado para controlar el sidebar móvil
  
  //paginate
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const postsPerPage = 10; //Define cantidad de productos por página

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      const fetchedCategories = await fetchCategories();
      const fetchedProducts = await fetchProducts();
      setCategories(fetchedCategories);
      setProducts(fetchedProducts.sort(() => Math.random() - 0.5)); // Mezcla los productos aleatoriamente
    };

    loadCategoriesAndProducts();
  }, []);

  const toggleMobileSidebar = () => { // Función para cambiar el estado del sidebar móvil
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  const currentPosts = products.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage); // Divide en 10 productos por página


  return (
    <div className={styles.homePage}>
      <div className={styles.topSection}>
      <SearchBar className={styles.searchBar} />
        <CategoryList categories={categories} className={styles.categoryList} />
        <button className={styles.filterButtonMobile} onClick={toggleMobileSidebar}> {/* Botón de filtro móvil */}
          Filtros {/* Se reemplaza el icono con texto "Filtros" */}
        </button>
      </div>

      <div className={styles.homePageContainer}>
      <WebsiteSidebar
          className={styles.sidebar}
          isMobileSidebarOpen={isMobileSidebarOpen} // Pasa el estado al Sidebar
          toggleMobileSidebar={toggleMobileSidebar} // Pasa la función para cambiar el estado
        />

        <main className={styles.mainContent}>
          <h3>Recomendaciones</h3>
          <div className={styles.productGrid}>
            {currentPosts.map(product => (
              <ProductCard
                key={product.clotheId}
                product={product}
                categories={categories}
                onClick={() => navigate(`/product/${product.clotheId}`)}
              />
            ))}
          </div>
          <Pagination
            totalPosts={products.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
      {isMobileSidebarOpen && <div className={styles.sidebarOverlay} onClick={toggleMobileSidebar}></div>} {/* Overlay para cerrar sidebar */}
    </div>
  );
};

export default HomePage;