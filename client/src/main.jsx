import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/Cart.jsx";
import { UserProvider } from "./context/User.jsx";
import { CategoryProvider } from "./context/Category.jsx";
import { ProductProvider } from "./context/Product.jsx";


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <CategoryProvider>
        <UserProvider>
          <CartProvider>
            <ProductProvider>
              <ToastContainer position="top-center" autoClose={800} />
                <App />
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </CategoryProvider>
    </BrowserRouter>
);
