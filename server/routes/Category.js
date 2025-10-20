import express from "express"
import { addCategory, getAllCategory, getCategoryProducts } from "../controllers/Category.js";

const categoryRouter = express.Router();

categoryRouter.post("/add-category" , addCategory)
categoryRouter.get("/get-categories" , getAllCategory)
categoryRouter.post("/category-products",getCategoryProducts);
export {categoryRouter} ;