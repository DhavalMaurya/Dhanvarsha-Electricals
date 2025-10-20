import { useContext, useState } from "react";
import { CartContext } from "../context/Cart";
import { UserContext } from "../context/User";
import { toast } from "react-toastify";
import { createEnquiry } from "../services/apis/Enquiry";
import EnquiryForm from "../components/Cart/EnquiryForm";
import CartItem from "../components/Cart/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    companyName: "",
    message: "",
    country: "",
  });

  const handleOnChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const productMessageInput = (productId, message) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, message: message } : item
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const descreaseQuality = (productId) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const handleQuantityInput = (productId, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === productId ? { ...item, quantity: num } : item
        )
      );
    }
  };

  const removeCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const requiredFields = [
      { name: "name", value: form.name, message: "Name is required" },
      { name: "email", value: form.email, message: "Email is required" },
      {
        name: "contact",
        value: form.contact,
        message: "Phone number is required",
      },
      {
        name: "companyName",
        value: form.companyName,
        message: "Company name is required",
      },
      {
        name: "message",
        value: form.message,
        message: "Message cannot be empty",
      },
      {
        name: "country",
        value: form.country,
        message: "Please select your country",
      },
    ];

    const missingFields = requiredFields.filter((field) => !field.value);

    // Set errors for UI highlighting
    const errorState = {};
    missingFields.forEach((field) => {
      errorState[field.name] = true;
    });
    setErrors(errorState);

    // Show toast messages
    // Show single toast if any field is missing
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Please select at least one product for enquiry");
      return;
    }

    const enquiryData = {
      products: cart,
      contact: form.contact,
      email: form.email,
      name: form.name,
      message: form.message,
      companyName: form.companyName,
      country: form.country,
    };
    console.log(enquiryData);
    const response = await createEnquiry(enquiryData);

    setLoading(true);

    if (response.success) {
      setCart([]);
      navigate("/");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700">Your Enquiry Cart</h1>
        <p className="text-gray-600 mt-2">
          Review your selected items and submit your inquiry to our team.
        </p>
      </div>

      <CartItem
        cart={cart}
        descreaseQuality={descreaseQuality}
        increaseQuantity={increaseQuantity}
        removeCartItem={removeCartItem}
        productMessageInput={productMessageInput}
        handleQuantityInput={handleQuantityInput}
      />
      {/* Cart Items */}

      {/* Contact Form */}
      <EnquiryForm
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        form={form}
        user={user}
        errors={errors}
      />
    </div>
  );
};

export default Cart;
