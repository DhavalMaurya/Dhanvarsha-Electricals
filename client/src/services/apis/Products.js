import { toast } from "react-toastify";
import { apiConnecter } from "../axios.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const addProduct = async (name, description, features, category, image) => {

    if (!Array.isArray(features)) {
        return toast.error("Features must be an array");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    features.forEach((feature, i) => {
        formData.append(`features[${i}]`, feature);
    });

    try {
        const response = await apiConnecter("POST", `${apiUrl}/product/add-product`, formData, {
            "Content-Type": "multipart/form-data",
        });

        if (!response.data.success) {
            return toast.error(response.data.message);

        }

        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Add Product Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while adding product");
        return { success: false };
    }
};

export const editProduct = async (name, description, features, category, image = null, productId) => {

    if (!Array.isArray(features)) {
        return toast.error("Features must be an array");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("productId", productId);
    features.forEach((feature, i) => {
        formData.append(`features[${i}]`, feature);
    });

    try {
        const response = await apiConnecter("POST", `${apiUrl}/product/edit-product`, formData, {
            "Content-Type": "multipart/form-data",
        });

        if (!response.data.success) {
            return toast.error(response.data.message);

        }

        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Add Product Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while editing product");
        return { success: false };
    }
}

export const deleteProduct = async (produtId) => {

    try {
        const response = await apiConnecter("DELETE", `${apiUrl}/product/delete-product/${produtId}`);

        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }
        toast.success(response.data.message);
        return {
            success: true,
            products: response.data.allProducts,
            total: response.data.total,
        };
    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching products");
        return { success: false, products: [] };
    }
}

export const getAllProducts = async (categoryId, limit, page , search) => {
    try {
        const response = await apiConnecter("GET", `${apiUrl}/product/get-products?categoryId=${categoryId}&limit=${limit}&page=${page}&searchQuery=${search}`);
        console.log("api calling for product")
        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }

        return response.data;
    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching products");
        return error.response.data || { success: false, products: [], message: "Something went wron , try again later" };
    }
};

export const getProductDetails = async (productId) => {
    try {
        const response = await apiConnecter("GET", `${apiUrl}/product/product-detail/${productId}`);

        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }

        return response.data

    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching products");
        return { success: false, products: [] };
    }
}
