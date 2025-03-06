import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.module.css";

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
    <div className="register-container">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
