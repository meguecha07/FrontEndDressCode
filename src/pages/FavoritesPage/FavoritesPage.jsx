import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteFavorite, getUser } from '../../services/api';
import { fetchCategories, fetchColors } from '../../services/api'; // Importar nuevas funciones
import ProductCard from '../../components/website/ui/ProductCard/ProductCard';
import Notification from '../../components/Notification/Notification';
import styles from './FavoritesPage.module.css';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

const FavoritesPage = () => {
    const { user } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [categories, setCategories] = useState([]); // Nuevo estado para categorías
    const [colors, setColors] = useState([]); // Nuevo estado para colores
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadInitialData = async () => {
        try {
            setLoading(true);
            // Cargar datos en paralelo
            const [userData, categoriesData, colorsData] = await Promise.all([
                getUser(user.id),
                fetchCategories(),
                fetchColors()
            ]);
            
            setFavorites(userData.favoriteClothes || []);
            setCategories(categoriesData);
            setColors(colorsData);
            setError(null);
        } catch (err) {
            setError('Error cargando datos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadInitialData();
        }
    }, [user]);

    const handleRemoveFavorite = async (clotheId) => {
        try {
            await deleteFavorite(user.id, clotheId);
            setNotificationMessage('Artículo eliminado de favoritos ❌');
            setShowNotification(true);
            await loadInitialData(); // Recargar todos los datos
        } catch (error) {
            console.error("Error eliminando favorito:", error);
            setNotificationMessage('Error al eliminar el favorito ⚠️');
            setShowNotification(true);
        }
    };

    if (loading) return <div className={styles.loading}><LoadingSpinner /></div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            {showNotification && (
                <Notification 
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}
            
            <h1 className={styles.title}>Tus Preferidos</h1>
            
            <div className={styles.grid}>
                {favorites.map((product) => (
                    <div key={product.clotheId} className={styles.cardContainer}>
                        <ProductCard 
                            product={product} 
                            categories={categories}  // Usar categorías reales
                            colors={colors}          // Usar colores reales
                            onClick={() => navigate(`/product/${product.clotheId}`)}
                        />
                        <button 
                            className={styles.removeButton}
                            onClick={() => handleRemoveFavorite(product.clotheId)}
                            aria-label="Eliminar de favoritos"
                        >
                            Eliminar
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                ))}
                
                {favorites.length === 0 && (
                    <div className={styles.empty}>
                        <i className="fa-regular fa-heart-circle-broken"></i>
                        <p>Tu lista de favoritos está vacía</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;