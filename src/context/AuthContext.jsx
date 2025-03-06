import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate(); // Asegura que se use dentro de un BrowserRouter

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.sub,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          role: decoded.role[0], // Porque viene como array
        });
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        logout();
      }
    }
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Error en el registro");
      return await response.json();
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const data = await response.json();
      localStorage.setItem("token", data.jwt);
      setToken(data.jwt);

      const decoded = jwtDecode(data.jwt);
      setUser({
        email: decoded.sub,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role[0],
      });
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setTimeout(() => navigate("/"), 0); // 🔹 Asegura que la navegación se haga después del renderizado
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

