import { toast } from "react-toastify";
import { apiConnecter } from "../axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getSimilarProduct = async (categoryId) => {
    try {
        const response = await apiConnecter("POST", `${apiUrl}/category/category-products`, { categoryId });

        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }

        return response.data

    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching similar products");
        return { success: false, products: [] };
    }
}

export const getAllCategory = async () => {
    try {
        const response = await apiConnecter("GET", `${apiUrl}/category/get-categories`);
        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }
        return response.data
    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching similar products");
        return { success: false, products: [] };
    }
}

export const addCategory = async (name) => {
    try {
        const response = await apiConnecter("POST", `${apiUrl}/category/add-category`, { name });
        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }
        toast.success(response.data.message);
        return response.data
    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while adding category");
        return error?.response?.data
    }
}