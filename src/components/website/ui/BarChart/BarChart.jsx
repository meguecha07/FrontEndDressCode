import React from 'react';
import PropTypes from 'prop-types';
import styles from './BarChart.module.css';

const BarChart = ({ bars, values }) => {
  if (bars !== values.length) {
    return <p>Error: The number of bars must match the length of the values array.</p>;
  }

  const total = values.reduce((acc, value) => acc + value, 0);

  return (
    <div className={styles.barChart}>
      {values.map((value, index) => {
        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;

        return (
          <div key={index} className={styles.barContainer}>
            <span className={styles.barName}>{`${index + 1} estrellas`}</span>
            
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{ width: `${percentage}%`, backgroundColor: '#ffa41c' }}
                title={`${value} votos`} // tooltip
              ></div>
              <span className={styles.barLabel}>{`${percentage}%`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

BarChart.propTypes = {
  bars: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

export default BarChart;