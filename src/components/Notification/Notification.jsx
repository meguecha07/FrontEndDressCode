import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Notification.module.css';

const Notification = ({ message, onClose, buttonLabel, buttonAction }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${message.includes('eliminado') ? styles.remove : styles.add}`}>
      <div className={styles.content}>
        <i className={`fa-solid ${message.includes('eliminado') ? 'fa-trash-can' : 'fa-circle-check'}`}></i>
        <span>{message}</span>
      </div>
      
      {buttonLabel && (
        <button 
          className={styles.actionButton}
          onClick={() => {
            buttonAction && buttonAction(navigate);
            onClose();
          }}
        >
          {buttonLabel} <i className="fa-solid fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

export default Notification;