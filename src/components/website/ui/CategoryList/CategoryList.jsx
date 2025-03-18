import styles from './CategoryList.module.css';

const CategoryList = ({ categories, selectedCategories, onSelectCategory }) => {
  const defaultImageUrl = "https://cdn-icons-png.flaticon.com/512/7552/7552762.png";

  return (
    <div className={styles.categoryList}>
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.categoryId);
        return (
          <button
            key={category.categoryId}
            className={`${styles.categoryButton} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelectCategory(category.categoryId)}
          >
            <img src={category.categoryImagenUrl || defaultImageUrl} alt={category.name} className={styles.categoryImage} />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryList;
