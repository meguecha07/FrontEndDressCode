import styles from './CategoryList.module.css';


const CategoryList = ({categories}) => {
  return (
    <div className={styles.categoryList}>
      {categories.map((category, index) => (
        <button key={index} className={styles.categoryButton}>
          <img src={category.imageUrl} alt={category.name} className={styles.categoryImage} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;