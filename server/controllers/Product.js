import mongoose from "mongoose";
import User from "../models/User.js";
import Category from "../models/Categorys.js";
import Products from "../models/Products.js";
import imageUploader from "../utils/imageUploader.js";


export const addProduct = async (req, res) => {
    const { name, description, features, category } = req.body
    const image = req.file
    let image_url = ""
    try {

        if (!name || !description || !features || !image) {
            return res.status(400).json({ success: false, message: "All fields require" });
        }

        if (!Array.isArray(features)) {
            return res.status(400).json({ success: false, message: "Features must be a non-empty array" });
        }

        const categoryId = category?.trim();

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }


        try {
            const upload = await imageUploader(image)
            image_url = upload.secure_url
        } catch (error) {
            console.error("Image Upload Error:", error);
            return res.status(500).json({ success: false, message: "Something went wrong while uploading the image , try again later", error });
        }

        const product = await Products.create({
            name,
            description,
            features,
            images: [image_url],
            category: categoryId,
        })

        await Category.findByIdAndUpdate(categoryId, {
            $push: {
                products: product._id
            }
        })

        return res.status(200).json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        console.error("Add Product Error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong while adding product , try again later", error })
    }

};

export const editProduct = async (req, res) => {
    const { name, description, features, category, productId } = req.body
    const image = req.file
    let image_url = ""

    try {

        if (!name || !description || !features || !productId) {
            return res.status(400).json({ success: false, message: "All fields require" });
        }

        if (!Array.isArray(features)) {
            return res.status(400).json({ success: false, message: "Features must be a non-empty array" });
        }

        const categoryId = category?.trim();

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ success: false, message: "Invalid category ID" });
        }

        //check the product existence and also check for category change
        const existingProduct = await Products.findById(productId);
        const categoryChanged = existingProduct.category.toString() !== categoryId;

        if (image) {
            try {
                const upload = await imageUploader(image)
                image_url = upload.secure_url
                var product = await Products.findByIdAndUpdate(productId, {
                    name,
                    description,
                    features,
                    category,
                    images: [image_url]
                })
            } catch (error) {
                console.error("Image Upload Error:", error);
                return res.status(500).json({ success: false, message: "Something went wrong while uploading the image , try again later", error });
            }
        } else {
            var product = await Products.findByIdAndUpdate(productId, {
                name,
                description,
                features,
                category,
            })
        }

        if (categoryChanged) {

            await Category.findByIdAndUpdate(existingProduct.category, {
                $pull: {
                    products: existingProduct._id
                }
            })

            await Category.findByIdAndUpdate(categoryId, {
                $push: {
                    products: product._id
                }
            })
        }

        return res.status(200).json({ success: true, message: "Product edited successfully", product });

    } catch (error) {
        console.error("Add Product Error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong while editing product , try again later", error })
    }
}

export const deleteProduct = async (req, res) => {
    const productId  = req.params.productId;

    if (!productId) {
        return res.status(400).json({ success: false, message: "Product Id must required to delete the product" });
    }

    try {

        const deletedProduct = await Products.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(400).json({ success: false, message: "Failed to delete the product" });
        }

        return res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" , error });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const allProducts = await Products.find({}, { name: 1, category: 1, images: 1, createdAt: 1 }).populate("category", "name _id")
        if (allProducts.length <= 0) {
            return res.status(204).json({ success: true, message: "No products found", allProducts, total: allProducts.length })
        }
        return res.status(200).json({ success: true, message: "Product fetched successfully", allProducts, total: allProducts.length })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong while fetching all products , try again later", error })
    }
};

export const getProductById = async (req, res) => {
    const productId  = req.params.productId;
    const id = await productId.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ProductId ID" });
        }
    try {
        const product = await Products.findById(id).populate("category")
        if (!product) {
            return res.status(204).json({ success: false, message: "product not found" })
        }
        return res.status(200).json({ success: true, message: "Product details fetched successfully", product })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong while fetching product details , try again later", error })
    }
};

export const getProducts = async (req, res) => {
    const { page , limit } = req.query;
    const categoryId = req.query.categoryId || "All"
    const searchQuery = req.query.searchQuery || ""
    let query = {};
    
    // Only apply category filter if it's not "All"
    if (categoryId !== "All") {
      query.category = categoryId.trim();
    }

    if(searchQuery !== ""){
        query.name = {$regex : searchQuery , $options : "i"}
    }

    const skip = (page - 1) * limit

    try {
        const products = await Products.find(query).populate({
            path: "category",
            select: "name _id",
        }).skip(skip).limit(limit);

        const totalProducts = await Products.countDocuments(query)

        if(products.length === 0){
        return res.status(200).json({ success: false, message: "No proucts found ", products: products, totalProducts, totalPages: Math.ceil(totalProducts / limit) ,  limit:limit })
        }

        return res.status(200).json({ success: true, message: "All products  fetched successfully", products: products, totalProducts, totalPages: Math.ceil(totalProducts / limit) ,  total:products?.length })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong while fetching  category products , try again later", error })
    }

}
