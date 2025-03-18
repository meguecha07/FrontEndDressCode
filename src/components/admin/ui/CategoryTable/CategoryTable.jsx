import { useState, useEffect } from "react";
import { fetchCategories, deleteCategory, updateCategory, createCategory } from "../../../../services/adminApi";
import CategoryFormModal from "../CategoryFormModal/CategoryFormModal";
import styles from "./CategoryTable.module.css";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    const handleAdd = () => {
        setCurrentCategory(null);
        setShowModal(true);
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setShowModal(true);
    };

    const handleDelete = async (categoryId, categoryName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la categoría ${categoryName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteCategory(categoryId);
            setCategories((prev) => prev.filter((category) => category.categoryId !== categoryId));
            loadCategories();
        } catch (error) {
            console.error("Error eliminando categoría:", error);
        }
    };

    const handleSave = async (categoryData) => {
        try {
            if (currentCategory) {
                const updatedCategory = await updateCategory(currentCategory.categoryId, categoryData);
                setCategories((prev) =>
                    prev.map((category) => (category.categoryId === updatedCategory.categoryId ? updatedCategory : category))
                );
            } else {
                const newCategory = await createCategory(categoryData);
                setCategories((prev) => [...prev, newCategory]);
            }
            setShowModal(false);
            setCurrentCategory(null);
            loadCategories();
        } catch (error) {
            console.error("Error guardando categoría:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de Categorías</h1>
                <button className={styles.addButton} onClick={handleAdd}>
                    Nueva Categoría
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>URL</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td data-label="ID">{category.categoryId}</td>
                                <td data-label="Nombre">{category.name}</td>
                                <td data-label="Descripción">{category.description}</td>
                                <td data-label="URL">{category.categoryImagenUrl}</td>
                                <td data-label="Imagen">
                                    {category.categoryImagenUrl && (
                                        <img 
                                            src={category.categoryImagenUrl} 
                                            alt={`Imagen de ${category.name}`} 
                                            className={styles.iconImage} 
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="Acciones" className={styles.actions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEditClick(category)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.delete}`}
                                        onClick={() => handleDelete(category.categoryId, category.name)}
                                        aria-label="Eliminar"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <CategoryFormModal
                    initialData={currentCategory}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentCategory(null);
                    }}
                />
            )}
        </div>
    );
};

export default CategoryTable;