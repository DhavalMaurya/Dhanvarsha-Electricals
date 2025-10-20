import React, { useContext, useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { login } from "../services/apis/User";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const response = await login(form.email, form.password);
    setLoading(false);
    if (response.success) {
      setToken(response?.token);
      navigate("/");
    }
  };

  return (
    <>
      <div className="min-h-[93vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Admin Login
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              Login to manage enquiries for 
              <span className="font-semibold text-indigo-600"> Dhanvarsha</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <div className="px-3 text-gray-500">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-2 bg-transparent focus:outline-none text-sm text-gray-800 rounded-r-xl"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <div className="px-3 text-gray-500">
                  <FiLock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-2 bg-transparent focus:outline-none text-sm text-gray-800 rounded-r-xl"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
