import { useEffect } from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${message.includes('eliminado') ? styles.remove : styles.add}`}>
      <span>{message.includes('eliminado') ? '🗑' : '✓'}</span> 
      {message}
    </div>
  );
};

export default Notification;