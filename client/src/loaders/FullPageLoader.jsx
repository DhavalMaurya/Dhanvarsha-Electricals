import React from "react";
import logo from "../assets/logo1.png"; // ✅ Make sure to replace this with your actual logo path

const FullPageLoader = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-white to-cyan-50">
      {/* Logo */}
      <img
        src={logo}
        alt="Dhanvarsha Electricals Logo"
        className="w-96 h-40 animate-bounce mb-6"
      />

      {/* Loading Text */}
      <p className="text-cyan-700 font-medium text-sm tracking-wide">
        Powering up your experience...
      </p>
    </div>
  );
};

export default FullPageLoader;
