import React, { lazy, Suspense, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/User";

// Layouts / Shared Components
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

// Pages
const Home = lazy(() => import("./Pages/Home"));
const Products = lazy(() => import("./Pages/Products"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const Login = lazy(() => import("./Pages/Login"));
const Cart = lazy(() => import("./Pages/Cart"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));

// Admin Pages
const Admin = lazy(() => import("./Pages/Admin"));
const AllProducts = lazy(() => import("./components/Admin/AllProducts"));
const Dashboard = lazy(() => import("./components/Admin/Dashboard"));
const Enquiry = lazy(() => import("./components/Admin/Enquiry"));
const AddProduct = lazy(() => import("./components/Admin/AddProduct"));
const AddCategory = lazy(() => import("./components/Admin/AddCategory"));

// Loaders
const FullPageLoader = lazy(() => import("./loaders/FullPageLoader"));

function App() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");
  const { user, token } = useContext(UserContext);
  // ✅ Admin Protected Route Wrapper
  const AdminProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    // optional: role check
    if (user?.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Suspense
      fallback={
        <div className="text-center mt-10">
          <FullPageLoader />
        </div>
      }
    >
      {/* Hide Navbar/Footer on admin pages */}
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiry" element={<Enquiry />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-category" element={<AddCategory />} />
          </Route>

          {/* Redirect all unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </Suspense>
  );
}

export default App;
