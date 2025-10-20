import express from "express"
import { addProduct, deleteProduct, editProduct, getAllProduct, getProductById, getProducts } from "../controllers/Product.js";
import {upload} from "../utils/multer.js"
const productRouter = express.Router();

productRouter.post("/add-product", upload.single("image") , addProduct)
productRouter.post("/edit-product", upload.single("image") , editProduct)
productRouter.delete("/delete-product/:productId" , deleteProduct)
productRouter.get("/get-products", getProducts);
productRouter.get("/product-detail/:productId", getProductById);

export { productRouter } 


