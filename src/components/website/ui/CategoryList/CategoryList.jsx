/* eslint-disable react/prop-types */
import styles from './CategoryList.module.css';


const CategoryList = ({categories}) => {
  const defaultImageUrl = "https://cdn-icons-png.flaticon.com/512/7552/7552762.png"; // ✅ URL de imagen por defecto

  return (
      <div className={styles.categoryList} id="efect">
          {categories.map((category, index) => (
              <button key={index} className={styles.categoryButton}>
                  <img
                      src={category.imageUrl || defaultImageUrl} // ✅ Usa category.imageUrl o defaultImageUrl
                      alt={category.categoryName}
                      className={styles.categoryImage}
                  />
                  <span>{category.categoryName}</span>
              </button>
          ))}
      </div>
  );
};

export default CategoryList;