import React, { useEffect, useState } from "react";

import { createContext } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("enquiryCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = async (product) => {
    const isProductAlreadyAdded = cart.some((item) => item._id === product._id);
    if (isProductAlreadyAdded) {
      return toast.error("Product Already added to cart");
    }
    setCart((prev) => [
      ...prev,
      {
        _id: product._id,
        name: product.name,
        quantity: 1,
        message: "",
        image: product.images[0],
        category: product.category.name,
      },
    ]);
    toast.success("Product added to enquiry cart");
  };

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("enquiryCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
