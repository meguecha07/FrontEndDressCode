import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Validaciones
  const validateInput = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;

    if (userData.firstName.trim().length < 3 || !nameRegex.test(userData.firstName)) {
      return "Nombre inválido: mínimo 3 caracteres, sin espacios iniciales o finales.";
    }
    if (userData.lastName.trim().length < 3 || !nameRegex.test(userData.lastName)) {
      return "Apellido inválido: mínimo 3 caracteres, sin espacios iniciales o finales.";
    }
    if (!emailRegex.test(userData.email)) {
      return "Correo electrónico inválido.";
    }
    if (!passwordRegex.test(userData.password)) {
      return "Contraseña inválida: mínimo 8 caracteres, con al menos una letra, un número y un carácter especial (@, #, $, etc.).";
    }
    return null;
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register(userData);
      navigate("/");
    } catch (err) {
      setError("Error en el registro. Intenta de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h2 className={styles.title}>Registro</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input className={styles.input} type="text" name="firstName" placeholder="Nombre" onChange={handleChange} required />
          <input className={styles.input} type="text" name="lastName" placeholder="Apellido" onChange={handleChange} required />
          <input className={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className={styles.input} type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <button className={styles.button} type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
