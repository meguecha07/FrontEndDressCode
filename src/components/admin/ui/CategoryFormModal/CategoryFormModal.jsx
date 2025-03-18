import { useState, useEffect } from 'react';
import styles from './CategoryFormModal.module.css';

const CategoryFormModal = ({ initialData, onSave, onClose }) => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        categoryImagenUrl: '',
        categoryId: null
    });

    useEffect(() => {
        if (initialData) {
            setCategory({
                name: initialData.name || '',
                description: initialData.description || '',
                categoryImagenUrl: initialData.categoryImagenUrl || '',
                categoryId: initialData.categoryId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedCategory = {
            name: category.name,
            description: category.description,
            categoryImagenUrl: category.categoryImagenUrl
        };
        onSave(formattedCategory);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className={styles.scrollContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>
                                <span>Nombre</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={category.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Descripción</span>
                                <textarea
                                    name="description"
                                    value={category.description}
                                    onChange={handleChange}
                                    className={styles.textarea}
                                    rows="4"
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Url Imagen</span>
                                <input
                                    type="text"
                                    name="categoryImagenUrl"
                                    value={category.categoryImagenUrl}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                            {category.categoryImagenUrl && (
                                <div className={styles.previewContainer}>
                                    <img 
                                        src={category.categoryImagenUrl} 
                                        alt="Vista previa de la imagen" 
                                        className={styles.previewImage} 
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelButton} onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className={styles.submitButton}>
                                {initialData ? 'Guardar Cambios' : 'Crear Categoría'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryFormModal;