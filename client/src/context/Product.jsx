import { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cachedProducts, setCachedProducts] = useState(null);

  return (
    <ProductContext.Provider value={{ cachedProducts, setCachedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;