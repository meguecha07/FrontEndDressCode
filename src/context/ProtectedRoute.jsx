import { Navigate, useLocation } from "react-router-dom";
import { useGlobal } from "./GlobalContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useGlobal();
  const location = useLocation(); // Obtiene la ruta actual

  // Si no hay usuario, redirigir al home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si es una ruta solo para admins y el usuario no es admin, redirigir al home
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;