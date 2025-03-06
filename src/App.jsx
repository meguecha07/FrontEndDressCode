import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import DashboardPage from "./pages/Admin/DashboardPage/DashboardPage";
import ProductsListPage from "./pages/Admin/ProductListPage/ProductListPage";
import OrdersListPage from "./pages/Admin/OrdersListPage/OrdersListPage";
import WebsiteHeader from "./components/website/layout/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "./components/website/layout/WebsiteFooter/WebsiteFooter";
import AdminHeader from "./components/admin/layout/AdminHeader/AdminHeader";
import ProtectedRoute from "./context/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Bloquear móviles en el panel de administración
  useEffect(() => {
    if (isAdminRoute) {
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileMediaQuery = window.matchMedia("(max-width: 768px)").matches;

      if (isMobileUserAgent || isMobileMediaQuery) {
        alert("El panel de administración requiere una pantalla más grande. Redirigiendo a la página principal...");
        navigate("/");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <AuthProvider>
      {!isAdminRoute && <WebsiteHeader />}
      {isAdminRoute && <AdminHeader />}

      <Routes>
        {/* Redirección desde /admin */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas para administración */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <ProductsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <OrdersListPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <WebsiteFooter />}
    </AuthProvider>
  );
}

export default App;