import { useState, useEffect } from 'react';
import styles from './AttributeFormModal.module.css';

const AttributeFormModal = ({ initialData, onSave, onClose }) => {
    const [attribute, setAttribute] = useState({
        name: '',
        iconUrl: '',
        attributeId: null
    });

    useEffect(() => {
        if (initialData) {
            setAttribute({
                name: initialData.name || '',
                iconUrl: initialData.iconUrl || '',
                attributeId: initialData.attributeId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttribute(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedAttribute = {
            name: attribute.name,
            iconUrl: attribute.iconUrl
        };
        onSave(formattedAttribute);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Editar Característica' : 'Nueva Característica'}</h2>
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
                                    value={attribute.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Url Icono</span>
                                <input
                                    type="text"
                                    name="iconUrl"
                                    value={attribute.iconUrl}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                            {attribute.iconUrl && (
                                <div className={styles.previewContainer}>
                                    <img 
                                        src={attribute.iconUrl} 
                                        alt="Vista previa del icono" 
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
                                {initialData ? 'Guardar Cambios' : 'Crear Característica'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AttributeFormModal;