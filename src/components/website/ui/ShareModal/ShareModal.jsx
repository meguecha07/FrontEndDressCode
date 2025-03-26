import { useState } from 'react';
import styles from './ShareModal.module.css';

const ShareModal = ({ isOpen, onClose, product}) => {
    const productUrl = `https://front-end-dress-code-flame.vercel.app/product/${product.clotheId}`;
    //const productUrl = `http://localhost:5173/product/${product.clotheId}`;
    const defaultMessage = `✨ Descubre este increíble look en Dresscode: ${product.name} ✨
¡Míralo aquí! 👗👇 ${productUrl}`;
    const [customMessage, setCustomMessage] = useState(defaultMessage);

    if (!isOpen) return null;

    const shareOnSocialMedia = (platform) => {
        let shareUrl = '';

        switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(customMessage || defaultMessage)}`;
            break;
        case 'twitter':
            shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(customMessage)}`;
            break;
        case 'instagram':
            navigator.clipboard.writeText(customMessage);
            alert('Producto copiado al portapapeles. Puedes pegarlo en Instagram.');
            return;
        default:
            return;
        }

        window.open(shareUrl, '_blank');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2 className={styles.sectionTitle}>Compartir Producto</h2>
                <div className={styles.sectionProduct}>
                    <div className={styles.sectionImage}>
                        <img src={product.imageUrls[0]} alt={product.name} className={styles.productImage} />
                    </div>
                    <div className={styles.sectionDescription}>
                        <p>{product.description}</p>
                        <textarea
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder={defaultMessage}
                            className={styles.customMessageInput}
                            rows={4}
                        />
                        <div className={styles.socialButtons}>
                            <button className={styles.socialButton} onClick={() => shareOnSocialMedia('facebook')}><i class="fa-brands fa-facebook"></i></button>
                            <button className={styles.socialButton} onClick={() => shareOnSocialMedia('twitter')}><i class="fa-brands fa-x-twitter"></i></button>
                            <button className={styles.socialButton} onClick={() => shareOnSocialMedia('instagram')}><i class="fa-brands fa-instagram"></i></button>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className={styles.closeButton}></button>
            </div>
        </div>
    );
    };

    export default ShareModal;
