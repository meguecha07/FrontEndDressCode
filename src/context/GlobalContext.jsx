import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Recuperar usuario desde localStorage
    }
  }, []);

  // Función para iniciar sesión (solo para pruebas)
  const login = () => {
    const fakeUser = {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@example.com",
      password: "123456", // Solo para pruebas
      role: "admin", // Puede ser "admin" o "usuario"
    };

    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <GlobalContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
