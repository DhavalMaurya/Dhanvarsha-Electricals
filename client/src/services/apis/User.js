import { apiConnecter } from "../axios.js"
import { toast } from "react-toastify"

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {

  try {
    if (!email || !password) {
      return toast.error("All fields require");
    }

    const response = await apiConnecter("POST", ` ${apiUrl}/auth/login`, { email, password });

    if (!response.data.success) {
      return toast.error(response.data.message);
    }

    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("expiryTime", Date.now() + 20 * 24 * 60 * 60 * 1000);

    toast.success(response.data.message);
    return response?.data
  } catch (error) {
    return toast.error(error.response.data.message)
  }
}

// expo rt const signUp = async (name, email, password, contact) => {

//   if (!name) {
//     toast.error("Name is required");
//     return;
//   }

//   if (!email) {
//     toast.error("Email is required");
//     return;
//   }

//   if (!password) {
//     toast.error("Password is required");
//     return;
//   }

//   if (!contact) {
//     toast.error("Contact number is required");
//     return;
//   }


//   try {
//     const response = await apiConnecter("POST", `${apiUrl}/auth/sign-up`, {
//       name,
//       email,
//       password,
//       contact,
//       role: "user",
//     });

//     console.log(response)

//     if (!response.data.success) {
//       return toast.error(response.data.message);
//     }

//     toast.success(response.data.message);
//     return response.data;
//   } catch (error) {
//     console.error("Signup Error:", error);
//     return toast.error(error.response?.data?.message || "Something went wrong");
//   }
// };

export const adminSignUp = async (name, email, password, contact) => {

  if (!name) {
    toast.error("Name is required");
    return;
  }

  if (!email) {
    toast.error("Email is required");
    return;
  }

  if (!password) {
    toast.error("Password is required");
    return;
  }

  if (!contact) {
    toast.error("Contact number is required");
    return;
  }


  try {
    const response = await apiConnecter("POST", `${apiUrl}/auth/sign-up`, {
      name,
      email,
      password,
      contact,
      role: "admin",
    });


    if (!response.data.success) {
      return toast.error(response.data.message);
    }

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    return toast.error(error.response?.data?.message || "Something went wrong");
  }
};

export const userDetails = async () => {
  try {
    const response = await apiConnecter("GET", `${apiUrl}/auth/user-details`);

    if (!response.data.success) {
      console.log(response)
      toast.error(response.data.message);
      return response.data;
    }

    return response.data;
  } catch (error) {
    console.error("Fetch User Details Error:", error);
    toast.error(error.response?.data?.message || "Something went wrong while fetching user details");
    return { success: false };
  }
};
