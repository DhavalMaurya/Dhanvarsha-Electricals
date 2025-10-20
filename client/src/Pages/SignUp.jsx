import React, { useState } from 'react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { GrContact } from "react-icons/gr";
import { signUp } from '../services/apis/User';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/User';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    contact : ''
  });
  const {setSignUpCredentials} = useContext(UserContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signUp(form.name , form.email , form.password , form.contact)
    if(response.success){
      setSignUpCredentials({email : form.email , password : form.password})
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-h-[93vh] flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transition-all">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              Join the Dhanvarsha community — your journey starts here.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <div className="px-3 text-gray-500">
                  <FiUser size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-2 bg-transparent focus:outline-none text-sm text-gray-800 rounded-r-xl"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 transition">
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

             <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                <div className="px-3 text-gray-500">
                  <GrContact size={18} />
                </div>
                <input
                  type="number"
                  name="contact"
                  placeholder="your contact number "
                  value={form.contact}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-2 bg-transparent focus:outline-none text-sm text-gray-800 rounded-r-xl"
                />
              </div>
            </div>


            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 transition">
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
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition-all"
            >
              Sign Up
            </button>
          </form>

          
          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>


          {/* Bottom Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
