// HomePage.js
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts, fetchColors } from '../../services/api';
import styles from './HomePage.module.css';
import ProductCard from '../../components/website/ui/ProductCard/ProductCard';
import Pagination from '../../components/website/ui/Pagination/Pagination';
import SearchBar from '../../components/website/ui/SearchBar/SearchBar';
import CategoryList from '../../components/website/ui/CategoryList/CategoryList';
import WebsiteSidebar from '../../components/website/layout/WebsiteSidebar/WebsiteSidebar';

const HomePage = () => {
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategoriesAndProducts = async () => {
      const fetchedCategories = await fetchCategories();
      const fetchedProducts = await fetchProducts();
      const fetchedColors = await fetchColors();
      setColors(fetchedColors);
      setCategories(fetchedCategories);
      setProducts(fetchedProducts.sort(() => Math.random() - 0.5));
      setFilteredProducts(fetchedProducts);
    };
    loadCategoriesAndProducts();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(categoryId);
      const newSelected = isSelected
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId];

      setFilteredProducts(
        newSelected.length === 0
          ? products
          : products.filter(product => newSelected.includes(product.categoryId))
      );

      return newSelected;
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setFilteredProducts(products);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const currentPosts = filteredProducts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className={styles.homePage}>
      <div className={styles.topSection}>
        <SearchBar className={styles.searchBar} />
        <CategoryList 
          categories={categories} 
          selectedCategories={selectedCategories} 
          onSelectCategory={handleCategorySelect} 
        />
        <button className={styles.filterButtonMobile} onClick={toggleMobileSidebar}>
          Filtros
        </button>
      </div>

      <div className={styles.homePageContainer}>
        <WebsiteSidebar 
          className={styles.sidebar} 
          isMobileSidebarOpen={isMobileSidebarOpen} 
          toggleMobileSidebar={toggleMobileSidebar} 
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={handleCategorySelect}
          products={products} 
        />

        <main className={styles.mainContent}>
          <h3>Recomendaciones <span>Mostrando {filteredProducts.length} de {products.length} productos.</span></h3>

          <div className={styles.productGrid}>
            {currentPosts.map(product => (
              <ProductCard key={product.clotheId} product={product} categories={categories} colors={colors} onClick={() => navigate(`/product/${product.clotheId}`)} />
            ))}
          </div>
          <Pagination totalPosts={filteredProducts.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
      </div>

      {isMobileSidebarOpen && <div className={styles.sidebarOverlay} onClick={toggleMobileSidebar}></div>}
    </div>
  );
};

export default HomePage;