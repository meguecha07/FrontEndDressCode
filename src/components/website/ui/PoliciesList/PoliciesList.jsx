import React from 'react';
import styles from './PoliciesList.module.css';
import { FaTshirt, FaClock, FaUserShield, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa'; // Íconos de react-icons

const policies = [
  {
    title: "Cuidado del Producto",
    icon: <FaTshirt />,
    description: [
      "La prenda debe ser devuelta en las mismas condiciones en las que fue alquilada.",
      "Evitar el contacto con perfumes, maquillaje y productos químicos.",
      "No se permite lavar ni planchar la prenda, el servicio incluye limpieza profesional."
    ]
  },
  {
    title: "Plazo de Devolución",
    icon: <FaClock />,
    description: [
      "La prenda debe ser devuelta en la fecha acordada.",
      "Si se devuelve antes del plazo, se aplicará un descuento.",
      "En caso de retraso, se cobrará un recargo diario."
    ]
  },
  {
    title: "Uso Adecuado",
    icon: <FaUserShield />,
    description: [
      "El producto es solo para uso personal, no puede ser prestado o subarrendado.",
      "Cualquier daño significativo generará costos adicionales."
    ]
  },
  {
    title: "Condiciones de Cancelación",
    icon: <FaTimesCircle />,
    description: [
      "Se permite la cancelación hasta 48 horas antes sin penalización.",
      "Cancelaciones con menos de 48 horas pueden tener un cargo del 20%."
    ]
  },
  {
    title: "Responsabilidad del Cliente",
    icon: <FaExclamationTriangle />,
    description: [
      "El cliente es responsable del correcto uso y cuidado de la prenda.",
      "En caso de pérdida o daño irreparable, se deberá cubrir el costo total de reposición."
    ]
  }
];

const PoliciesList = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Políticas de Uso</h2>
      <div className={styles.policiesGrid}>
        {policies.map((policy, index) => (
          <div key={index} className={styles.policyCard}>
            <h3 className={styles.policyTitle}>
              <span className={styles.icon}>{policy.icon}</span>
              {policy.title}
            </h3>
            <ul className={styles.policyList}>
              {policy.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoliciesList;
