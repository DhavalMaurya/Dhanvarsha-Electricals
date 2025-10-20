import { createContext, useEffect, useState } from "react";
import { getAllCategory } from "../services/apis/Category";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState(null);

  const fetchAllCategory = async () => {
    const response = await getAllCategory();

    if (!response.success) {
      return console.log("Failed to fetch Category", response);
    }

    setAllCategory(response.allCategory);
  };

  useEffect(() => {
    fetchAllCategory()
  }, []);

  return (
    <CategoryContext.Provider value={{ allCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
