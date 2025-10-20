import { toast } from "react-toastify";
import { apiConnecter } from "../axios"; // Adjust path

const apiUrl = import.meta.env.VITE_API_URL;

export const createEnquiry = async ({ products, companyName, message, contact, email, name }) => {
    // Basic validation

    const toastId = toast.loading("Submitting your enquiry...");
    if (!products || !Array.isArray(products) || products.length === 0) {
        return toast.error("At least one product is required in the enquiry." , {id : toastId});
    }


    const formattedProducts = products.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        message: item.message || "",
    }));

    console.log(contact)
    const payload = {
        products: formattedProducts,
        companyName,
        message,
        contact,
        email,
        name,
    };

    try {
        const response = await apiConnecter("POST", `${apiUrl}/enquiry/add-enquiry`, payload);

        if (!response.data.success) {

            return toast.error(response.data.message || "Failed to create enquiry" ,{id : toastId});
        }

        toast.success(response.data.message || "Enquiry submitted successfully" ,{id : toastId});
        localStorage.setItem("enquiryCart", [])
        toast.dismiss(toastId);
        return response.data;
    } catch (error) {
        console.error("Create Enquiry Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while creating enquiry" ,{id : toastId});
        return { success: false };
    }
};

export const getEnquires = async () => {
    try {
        const response = await apiConnecter("GET", `${apiUrl}/enquiry/get-enquiries`);

        if (!response.data.success) {
            console.log(response)
            toast.error(response.data.message);
            return response.data;
        }

        return response.data
    } catch (error) {
        console.error("Fetch Products Error:", error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching enquires");
        return { success: false, enquires: [] };
    }
};

export const updateStatus = async (enquiryId) => {

    if (!enquiryId) {
        return toast.error("Enquiry id not found");
    }
    try {
        const response = await apiConnecter("PUT", `${apiUrl}/enquiry/update-status/${enquiryId}`);
        if (!response.data.success) {
            return toast.error(response.data.message);
        }
        toast.success(response.data.message);
        return response.data;

    } catch (error) {

    }
}

export const getEnquiryDetails = async (enquiryId) => {
    try {
        const response = await apiConnecter("GET", `${apiUrl}/enquiry/get-details/${enquiryId}`);

        if (!response.data.success) {

            toast.error(response.data.message);
            return response.data;
        }

        return response.data

    } catch (error) {
        console.error("Fetch enquiry details Error:", error);
        return toast.error(error.response?.data?.message || "Something went wrong while enquiry detail");
    }
}
