import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DoubleCalendar.module.css';

registerLocale('es', es);

const DoubleCalendar = ({ 
  reservations, 
  productId, 
  onDatesChange,
  initialStartDate,
  initialEndDate
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      const start = new Date(initialStartDate);
      const end = new Date(initialEndDate);
      start.setUTCHours(0, 0, 0, 0);
      end.setUTCHours(0, 0, 0, 0);
      setStartDate(start);
      setEndDate(end);
    }
  }, [initialStartDate, initialEndDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const getDatesInRange = (start, end, returnDate) => {
      const dates = [];
      let currentDate = new Date(start);
      const effectiveEnd = returnDate ? new Date(returnDate) : new Date(end);
     
      while (currentDate <= effectiveEnd) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    const newDisabledDates = [];
   
    reservations.forEach(reservation => {
      reservation.items.forEach(item => {
        if (item.clotheId === productId && item.itemReservationStatus !== "DEVUELTO") {
          const dates = getDatesInRange(item.startDate, item.endDate, item.returnDate);
          newDisabledDates.push(...dates);
        }
      });
    });
    
    setDisabledDates(newDisabledDates);
  }, [reservations, productId]);

  const handleDateChange = dates => {
    const [start, end] = dates;
    
    if (start && endDate && start > endDate) {
      setEndDate(null);
      onDatesChange(start, null);
      return;
    }

    const isStartDisabled = start && disabledDates.some(d => 
      d.toDateString() === start.toDateString()
    );
    
    const isEndDisabled = end && disabledDates.some(d => 
      d.toDateString() === end.toDateString()
    );

    if (!isStartDisabled && !isEndDisabled) {
      const sortedStart = start && end && start > end ? end : start;
      const sortedEnd = start && end && start > end ? start : end;
      
      setStartDate(sortedStart);
      setEndDate(sortedEnd);
      onDatesChange(sortedStart, sortedEnd);
      
      if (sortedStart && sortedEnd) {
        setShowCalendar(false);
      }
    }
  };

  const formatDates = () => {
    if (!startDate && !endDate) return 'Seleccionar fechas';
    
    const options = { day: 'numeric', month: 'short' };
    const start = startDate?.toLocaleDateString('es-ES', options);
    const end = endDate ? endDate.toLocaleDateString('es-ES', options) : '';
    
    return end ? `${start} - ${end}` : start;
  };

  const handleClearDates = (e) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    onDatesChange(null, null);
  };

  return (
    <div className={styles.container} ref={calendarRef}>
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className={styles.triggerButton}
        aria-label="Seleccionar fechas"
      >
        <i className="fa-regular fa-calendar-days"></i>
        <span className={styles.datesText}>{formatDates()}</span>
       
        {(startDate || endDate) && (
          <button
            onClick={handleClearDates}
            className={styles.clearButton}
            aria-label="Limpiar fechas"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </button>
      {showCalendar && (
        <div className={styles.calendarDropdown}>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            minDate={new Date()}
            inline
            excludeDates={disabledDates}
            monthsShown={2}
            locale="es"
            calendarClassName={styles.doubleCalendar}
            dayClassName={date =>
              disabledDates.some(disabledDate =>
                disabledDate.toDateString() === date.toDateString()
              ) ? styles.disabledDay : null
            }
            className={styles.inlineCalendar}
          />
        </div>
      )}
    </div>
  );
};

export default DoubleCalendar;