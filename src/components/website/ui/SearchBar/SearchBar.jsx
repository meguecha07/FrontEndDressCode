import { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, onClear, searchQuery = '', filteredProducts = [] }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // Generar sugerencias mientras el usuario escribe
  useEffect(() => {
    if (query.trim().length > 1) {
      const suggestedProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limitamos a 5 sugerencias
      
      setSuggestions(suggestedProducts);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, filteredProducts]);

  // Cerrar sugerencias al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.name);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className={styles.searchBarContainer} ref={suggestionsRef}>
      <div className={styles.searchBar}>
        <button className={styles.button} onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <div className={styles.inputContainer}>
          {searchQuery && (
            <div className={styles.chipsContainer}>
              <span className={styles.filterChip}>
                {searchQuery}
                <button
                  className={styles.removeFilterButton}
                  onClick={() => onClear()}
                >
                  ×
                </button>
              </span>
            </div>
          )}
          <input
            type="text"
            placeholder="Buscar"
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => query.trim().length > 1 && setShowSuggestions(true)}
          />
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.clotheId}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className={styles.suggestionName}>{suggestion.name}</span>
              {suggestion.price && (
                <span className={styles.suggestionPrice}>${suggestion.price.toFixed(2)}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;