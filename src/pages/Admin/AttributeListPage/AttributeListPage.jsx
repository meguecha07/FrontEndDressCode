import AttributeTable from '../../../components/admin/ui/AttributeTable/AttributeTable';
import styles from './AttributeListPage.module.css';

const AttributesListPage = () => {
    return (
        <div className={styles.attributesPageContainer}>
            <AttributeTable />
        </div>
    );
};

export default AttributesListPage;