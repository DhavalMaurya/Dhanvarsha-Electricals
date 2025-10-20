import mongoose from "mongoose";
import Category from "../models/Categorys.js";
import Products from "../models/Products.js";

export const getAllCategory = async (req, res) => {
    try {

        const allCategory = await Category.find().select("name _id");

        if (!allCategory || allCategory.length <= 0) {
            return res.status(200).json({ success: true, message: "No category found , please add category ", allCategory, total: allCategory.length })
        }
        return res.status(200).json({ success: true, message: "all category fetched successfully", allCategory, total: allCategory.length })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong while fetching all category , try again later", error })
    }
}

export const addCategory = async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "All fields require" });
    }

    try {
        const formatedName = name[0].toUpperCase() + name.substring(1).toLowerCase();


        //check if category already exist
        const categoryExist = await Category.findOne({ name: formatedName });
        if (categoryExist) {
            return res.status(200).json({ success: false, message: "Category already exist" });
        }

        const category = await Category.create({ name : formatedName })
        return res.status(200).json({ success: true, message: "Categorcy added successfully", category });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong while adding category , try again later", error })
    }
}

export const getCategoryProducts = async (req, res) => {

    const { categoryId } = req.body;

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ success: false, message: "Invalid category ID" });
    }

    try {
        // const categoryProducts = await Category.findById({ _id: categoryId }).populate("products")
        const categoryProducts = await Category.findById(categoryId)
            .populate({
                path: "products",
                select: "name images createdAt category", // 👈 Only required product fields
                populate: {
                    path: "category",
                    select: "name _id",  // 👈 Only category name and _id
                },
            });

        if (categoryProducts.products.length <= 0) {
            return res.status(204).json({ success: true, message: "No products found in this category", products: categoryProducts.products, total: categoryProducts.products.length })
        }

        return res.status(200).json({ success: true, message: "all products of this category fetched successfully", products: categoryProducts.products, total: categoryProducts.products.length })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong while fetching  category products , try again later", error })
    }
}
