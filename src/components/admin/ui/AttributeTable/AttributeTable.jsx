import { useState, useEffect } from "react";
import { fetchAttributes, deleteAttribute, updateAttribute, createAttribute } from "../../../../services/adminApi";
import AttributeFormModal from "../AttributeFormModal/AttributeFormModal";
import styles from "./AttributeTable.module.css";

const AttributeTable = () => {
    const [attributes, setAttributes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentAttribute, setCurrentAttribute] = useState(null);

    useEffect(() => {
        loadAttributes();
    }, []);

    const loadAttributes = async () => {
        try {
            const fetchedAttributes = await fetchAttributes();
            setAttributes(fetchedAttributes);
        } catch (error) {
            console.error("Error cargando características:", error);
        }
    };

    const handleAdd = () => {
        setCurrentAttribute(null);
        setShowModal(true);
    };

    const handleEditClick = (attribute) => {
        setCurrentAttribute(attribute);
        setShowModal(true);
    };

    const handleDelete = async (attributeId) => {
        const confirmDelete = window.confirm("¿Estás seguro de eliminar esta característica?");
        if (!confirmDelete) return;
        try {
            await deleteAttribute(attributeId);
            setAttributes((prev) => prev.filter((attribute) => attribute.attributeId !== attributeId));
            loadAttributes();
        } catch (error) {
            console.error("Error eliminando característica:", error);
        }
    };

    const handleSave = async (attributeData) => {
        try {
            if (currentAttribute) {
                const updatedAttribute = await updateAttribute(currentAttribute.attributeId, attributeData);
                setAttributes((prev) =>
                    prev.map((attribute) => (attribute.attributeId === updatedAttribute.attributeId ? updatedAttribute : attribute))
                );
            } else {
                const newAttribute = await createAttribute(attributeData);
                setAttributes((prev) => [...prev, newAttribute]);
            }
            setShowModal(false);
            setCurrentAttribute(null);
            loadAttributes();
        } catch (error) {
            console.error("Error guardando característica:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gestión de Características</h1>
                <button className={styles.addButton} onClick={handleAdd}>
                    Nueva Característica
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>URL</th>
                            <th>Icono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map((attribute) => (
                            <tr key={attribute.id}>
                                <td data-label="ID">{attribute.attributeId}</td>
                                <td data-label="Nombre">{attribute.name}</td>
                                <td data-label="URL">{attribute.iconUrl}</td>
                                <td data-label="Icono">
                                    {attribute.iconUrl && (
                                        <img 
                                            src={attribute.iconUrl} 
                                            alt={`Icono de ${attribute.name}`} 
                                            className={styles.iconImage} 
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="Acciones" className={styles.actions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEditClick(attribute)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.delete}`}
                                        onClick={() => handleDelete(attribute.attributeId)}
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
                <AttributeFormModal
                    initialData={currentAttribute}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentAttribute(null);
                    }}
                />
            )}
        </div>
    );
};

export default AttributeTable;