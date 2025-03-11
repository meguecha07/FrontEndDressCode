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
    const [uploadingImages, setUploadingImages] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);


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
                colorId: initialData.color?.colorId || '',
                categoryId: initialData.category?.categoryId || '',
                price: initialData.price || '',
                stock: initialData.stock || '',
                size: initialData.size || '',
                active: initialData.active !== undefined ? initialData.active : true,
                images: initialData.images?.map(img => ({ url: img.imageContent })) || [],
                description: initialData.description || '',
                attributes: initialData.attributes?.map(attr => attr.attributeId) || []
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
        setProduct(prev => ({ ...prev, categoryId: e.target.value }));
    };

    const handleColorChange = (e) => {
        setProduct(prev => ({ ...prev, colorId: e.target.value }));
    };


    const handleImageChange = (e) => {
        setImageUploadError(null);
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = [];
            Promise.all(files.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        newImages.push({ file: file, base64: reader.result });
                        resolve();
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            }))
            .then(() => {
                setProduct(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
            })
            .catch(error => {
                console.error("Error reading image files:", error);
                setImageUploadError("Error al cargar algunas imágenes.");
            });
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
        setUploadingImages(true);
        setImageUploadError(null);
        try {
            const uploadedImageIds = [];
            for (const image of product.images) {
                if (image.base64) {
                    try {
                        const imageData = { imageContent: image.base64.split(',')[1] };
                        const uploadedImage = await createImage(imageData);
                        uploadedImageIds.push(uploadedImage.imagenId);
                    } catch (uploadError) {
                        console.error("Error uploading image:", uploadError);
                        setImageUploadError("Error al subir una o más imágenes. Intente nuevamente.");
                        setUploadingImages(false);
                        return;
                    }
                } else if (image.url && initialData) {
                    const initialImageData = initialData?.images?.find(img => img.imageContent === image.url);
                    if (initialImageData?.imagenId) {
                        uploadedImageIds.push(initialImageData.imagenId);
                    }
                }
            }

            const formattedProduct = {
                sku: product.sku,
                description: product.description,
                size: product.size,
                name: product.name,
                price: parseFloat(product.price),
                stock: parseInt(product.stock, 10),
                active: product.active,
                categoryID: parseInt(product.categoryId, 10),
                colorID: parseInt(product.colorId, 10),
                imageIds: uploadedImageIds,
                attributeIds: product.attributes.map(attr => parseInt(attr, 10))
            };
            onSave(formattedProduct);
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setUploadingImages(false);
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
                                        <option key={color.colorId} value={color.colorId}>{color.colorName}</option>
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
                                            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
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
                            <label>
                                <span>Imágenes</span>
                                <div className={styles.imageFields}>
                                    {product.images.map((img, index) => (
                                        <div key={index} className={styles.imageInput}>
                                            {img.url && <p>Imagen Existente URL: {img.url.substring(0, 30)}...</p>}
                                            {img.base64 && <p>Nueva Imagen Cargada</p>}
                                            {imageUploadError && <p className={styles.errorMessage}>{imageUploadError}</p>}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className={styles.removeImageButton}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={styles.input}
                                    />

                                </div>
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label>
                                <span>Características</span>
                                {attributes.map(attr => (
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
                                ))}
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
                            <button type="submit" className={styles.submitButton} disabled={uploadingImages}>
                                {uploadingImages ? 'Subiendo Imágenes...' : (initialData ? 'Guardar Cambios' : 'Crear Producto')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductFormModal;