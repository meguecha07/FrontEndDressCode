import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts, fetchColors, searchProducts } from '../../services/api';
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
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Current search query
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

  // Apply category filters to products
  useEffect(() => {
    // Only filter by category if there's no search active
    if (!searchResults) {
      setFilteredProducts(
        selectedCategories.length === 0
          ? products
          : products.filter(product => selectedCategories.includes(product.categoryId))
      );
    }
  }, [selectedCategories, products, searchResults]);

  const handleSearch = async (query) => {
    try {
      // Usamos filteredProducts que ya contiene los productos filtrados por categoría
      const results = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setCurrentPage(1);
      setSearchQuery(query);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSearchResults([]);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(categoryId);
      
      // Update selectedCategories
      return isSelected
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId];
    });
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchResults(null);
    setSearchQuery('');
    setFilteredProducts(products);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Compute displayed products and counts
  const displayedProducts = searchResults || 
    filteredProducts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    
  const resultsCount = searchResults ? searchResults.length : filteredProducts.length;
  const hasActiveFilters = searchQuery || selectedCategories.length > 0;

  return (
    <div className={styles.homePage}>
      <div className={styles.topSection}>
        <SearchBar
          className={styles.searchBar}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onClear={handleClearSearch}
          filteredProducts={filteredProducts}
        />
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
          <div className={styles.resultsHeader}>
            <h3>
              {searchResults ? 'Resultados de búsqueda' : 'Recomendaciones'}
              <span>
                Mostrando {resultsCount} {searchResults ? 'resultados' : `de ${products.length} productos`}
              </span>
            </h3>
            {hasActiveFilters && (
              <button className={styles.clearAllButton} onClick={clearAllFilters}>
                Limpiar todos los filtros
              </button>
            )}
          </div>
          <div className={styles.productGrid}>
            {displayedProducts.map(product => (
              <ProductCard
                key={product.clotheId}
                product={product}
                categories={categories}
                colors={colors}
                onClick={() => navigate(`/product/${product.clotheId}`)}
              />
            ))}
          </div>
          {!searchResults && (
            <Pagination
              totalPosts={filteredProducts.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </main>
      </div>
      {isMobileSidebarOpen && <div className={styles.sidebarOverlay} onClick={toggleMobileSidebar}></div>}
    </div>
  );
};

export default HomePage;