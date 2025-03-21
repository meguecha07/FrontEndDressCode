import { useAuth } from '../../context/AuthContext';
import { deleteFavorite } from '../../services/api';
import ProductCard from '../../components/website/ui/ProductCard/ProductCard';
import Notification from '../../components/Notification/Notification';
import styles from './FavoritesPage.module.css';
import { useState, useEffect } from 'react';
const FavoritesPage = () => {
  const { user } = useAuth();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleRemoveFavorite = async (clotheId) => {
    try {
      await deleteFavorite(user.id, clotheId);
      setNotificationMessage('Eliminado de favoritos');
      setShowNotification(true);
      
      // Actualización manual de la UI
      user.favoriteClothes = user.favoriteClothes.filter(item => item.clotheId !== clotheId);
    } catch (error) {
      console.error("Error eliminando favorito:", error);
      setNotificationMessage('Error al eliminar favorito');
      setShowNotification(true);
    }
  };

  return (
    <div className={styles.container}>
      {showNotification && <Notification message={notificationMessage} onClose={() => setShowNotification(false)} />}
      
      <h1 className={styles.title}>Tus Favoritos</h1>
      
      <div className={styles.grid}>
        {user?.favoriteClothes?.map((product) => (
          <div key={product.clotheId} className={styles.cardContainer}>
            <ProductCard 
              product={product} 
              categories={[]} 
              colors={[]} 
            />
            <button 
              className={styles.removeButton}
              onClick={() => handleRemoveFavorite(product.clotheId)}
            >
              Eliminar
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        ))}
        
        {user?.favoriteClothes?.length === 0 && (
          <div className={styles.empty}>
            <i className="fa-regular fa-heart-circle-broken"></i>
            <p>Aún no tienes favoritos guardados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;