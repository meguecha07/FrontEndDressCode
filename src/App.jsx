import { Routes, Route, useLocation } from "react-router-dom";
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
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Renderizar WebsiteHeader solo si NO estamos en una ruta de admin */}
      {!isAdminRoute && <WebsiteHeader />}
      {/* Renderizar AdminHeader solo en rutas de admin */}
      {isAdminRoute && <AdminHeader />}

      <Routes>
        {/* Rutas del sitio web */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Rutas del panel de administración */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/products" element={<ProductsListPage />} />
        <Route path="/admin/orders" element={<OrdersListPage />} />
      </Routes>

      {/* Footer solo en la web pública */}
      {!isAdminRoute && <WebsiteFooter />}
    </>
  );
}

export default App;
