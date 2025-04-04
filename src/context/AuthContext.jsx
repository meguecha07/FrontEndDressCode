import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({
            id: decoded.idUser,
            email: decoded.sub,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            role: decoded.role[0],
          });
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await fetch("https://triumphant-appreciation-production.up.railway.app/auth/register", {
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
      const response = await fetch("https://triumphant-appreciation-production.up.railway.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas");

      const data = await response.json();
      localStorage.setItem("token", data.jwt);
      setToken(data.jwt);
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setTimeout(() => navigate("/"), 0);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading,
      register, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};