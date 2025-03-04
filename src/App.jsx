import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import DashboardPage from "./pages/Admin/DashboardPage/DashboardPage";
import ProductsListPage from "./pages/Admin/ProductListPage/ProductListPage";
import OrdersListPage from "./pages/Admin/OrdersListPage/OrdersListPage";
import WebsiteHeader from "./components/website/layout/WebsiteHeader/WebsiteHeader";
import WebsiteFooter from "./components/website/layout/WebsiteFooter/WebsiteFooter";
import AdminHeader from "./components/admin/layout/AdminHeader/AdminHeader";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/administrador");

  // Detección móvil mejorada
  useEffect(() => {
    if (isAdminRoute) {
      // Combinación de User Agent y Media Query
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
        .test(navigator.userAgent);
      
      const isMobileMediaQuery = window.matchMedia("(max-width: 768px)").matches;

      if (isMobileUserAgent || isMobileMediaQuery) {
        alert("El panel de administración requiere una pantalla más grande. Redirigiendo a la página principal...");
        navigate("/");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {!isAdminRoute && <WebsiteHeader />}
      {isAdminRoute && <AdminHeader />}

      <Routes>
        {/* Redirección desde /admin */}
        <Route path="/administrador" element={<Navigate to="/administrador/dashboard" replace />} />

        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Rutas de administración */}
        <Route path="/administrador/dashboard" element={<DashboardPage />} />
        <Route path="/administrador/products" element={<ProductsListPage />} />
        <Route path="/administrador/orders" element={<OrdersListPage />} />
      </Routes>

      {!isAdminRoute && <WebsiteFooter />}
    </>
  );
}

export default App;