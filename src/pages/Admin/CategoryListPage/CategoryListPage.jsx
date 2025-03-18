import CategoryTable from '../../../components/admin/ui/CategoryTable/CategoryTable';
import styles from './CategoryListPage.module.css';

const CategoriesListPage = () => {
    return (
        <div className={styles.categoriesPageContainer}>
            <CategoryTable />
        </div>
    );
};

export default CategoriesListPage;