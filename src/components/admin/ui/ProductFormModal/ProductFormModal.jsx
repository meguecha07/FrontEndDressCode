import { useState, useEffect } from 'react';
import { fetchCategories, fetchColors, createImage, fetchAttributes } from '../../../../services/adminApi';
import styles from './ProductFormModal.module.css';

const ProductFormModal = ({ initialData, onSave, onClose }) => {
    const [product, setProduct] = useState({
        sku: '',
        name: '',
        colorId: '',
        categoryId: '',
        price: '',
        stock: '',
        size: '',
        active: true,
        images: [],
        attributes: [],
        description: ''
    });
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        const loadOptions = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                const fetchedColors = await fetchColors();
                setColors(fetchedColors);
                const fetchedAttributes = await fetchAttributes();
                setAttributes(fetchedAttributes);
            } catch (error) {
                console.error("Error fetching categories/colors/attributes:", error);
            }
        };
        loadOptions();

        if (initialData) {
            setProduct({
                sku: initialData.sku || '',
                name: initialData.name || '',
                colorId: initialData.colorId || '',
                categoryId: initialData.categoryId || '',
                price: initialData.price || '',
                stock: initialData.stock || '',
                size: initialData.size || '',
                active: initialData.active !== undefined ? initialData.active : true,
                images: initialData.imageUrls || [], // Aquí corregimos
                attributes: initialData.attributeIds || [], // Aquí corregimos
                description: initialData.description || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setProduct(prev => ({
            ...prev,
            [name]: inputValue
        }));
    };

    const handleCategoryChange = (e) => {
        setProduct(prev => ({ ...prev, categoryId: parseInt(e.target.value, 10) }));
    };

    const handleColorChange = (e) => {
        setProduct(prev => ({ ...prev, colorId: parseInt(e.target.value, 10) }));
    };

    const handleAddImage = () => {
        if (imageUrl.trim()) {
            setProduct(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
            setImageUrl('');
        }
    };

    const handleRemoveImage = (index) => {
        setProduct(prev => {
            const newImages = prev.images.filter((_, i) => i !== index);
            return { ...prev, images: newImages };
        });
    };

    const handleChangeAttributes = (e) => {
        const { value, checked } = e.target;
        const attrId = parseInt(value, 10); // Convertir a número
    
        setProduct(prev => {
            let updatedAttributes = checked 
                ? [...prev.attributes, attrId] 
                : prev.attributes.filter(attr => attr !== attrId);
    
            return { ...prev, attributes: updatedAttributes };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formattedProduct = {
                sku: product.sku,
                description: product.description,
                size: product.size,
                name: product.name,
                price: parseFloat(product.price),
                stock: parseInt(product.stock, 10),
                active: product.active,
                categoryId: parseInt(product.categoryId, 10),
                colorId: parseInt(product.colorId, 10),
                imageUrls: product.images,
                attributeIds: product.attributes.map(attr => parseInt(attr, 10))
            };

            onSave(formattedProduct);
        } catch (error) {
            console.error("Error saving product:", error);
        } 
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className={styles.scrollContainer}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                         <div className={styles.formGroup}>
                            <label>
                                <span>SKU</span>
                                <input
                                    type="text"
                                    name="sku"
                                    value={product.sku}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Nombre del Producto</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Color</span>
                                <select
                                    name="colorId"
                                    value={product.colorId}
                                    onChange={handleColorChange}
                                    className={styles.input}
                                    required
                                >
                                    <option value="">Selecciona un color</option>
                                    {colors.map(color => (
                                        <option key={color.colorId} value={color.colorId}>{color.name}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>
                                    <span>Categoría</span>
                                    <select
                                        name="categoryId"
                                        value={product.categoryId}
                                        onChange={handleCategoryChange}
                                        className={styles.input}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map(category => (
                                            <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className={styles.formGroup}>
                                <label>
                                    <span>Precio</span>
                                    <div className={styles.priceInput}>
                                        <span className={styles.currency}>$</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                         <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>
                                    <span>Talla</span>
                                    <input
                                        type="text"
                                        name="size"
                                        value={product.size}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </label>
                            </div>

                            <div className={styles.formGroup}>
                                <label>
                                    <span>Stock</span>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={product.stock}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </label>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={product.active}
                                    onChange={handleChange}
                                    className={styles.checkboxInput}
                                />
                                <span>Producto Activo</span>
                            </label>
                        </div>


                        <div className={styles.formGroup}>
                            <label><span>Imágenes</span></label>
                            <div className={styles.imageInputContainer}>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Ingrese la URL de la imagen"
                                    className={styles.input}
                                />
                                <button type="button" onClick={handleAddImage} className={styles.addButton}>
                                    Añadir
                                </button>
                            </div>

                            <div className={styles.imageGrid}>
                                {product.images.map((img, index) => (
                                    <div key={index} className={styles.imageItem}>
                                        <img src={img} alt={`Imagen ${index + 1}`} className={styles.imagePreview} />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className={styles.removeButton}> x</button>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className={styles.formGroup}>
                            <label>
                                <span>Características</span>
                                {attributes.length > 0 ? (
                                    attributes.map(attr => (
                                        <div key={attr.attributeId} className={styles.checkboxContainer}>
                                            <label className={styles.checkboxAttributeLabel}>
                                                <input
                                                    type="checkbox"
                                                    value={attr.attributeId}
                                                    checked={product.attributes.includes(attr.attributeId) || false}
                                                    onChange={handleChangeAttributes}
                                                    className={styles.checkboxInput}
                                                />
                                                <img src={attr.iconUrl} alt="icono" />
                                                <span>{attr.name}</span>
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className={styles.noAttributesMessage}>No se ha registrado ninguna característica.</p>
                                )}
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Descripción</span>
                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    className={styles.textarea}
                                    rows="4"
                                    required
                                />
                            </label>
                        </div>

                        

                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelButton} onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className={styles.submitButton} >
                                {initialData ? 'Guardar Cambios' : 'Crear Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;