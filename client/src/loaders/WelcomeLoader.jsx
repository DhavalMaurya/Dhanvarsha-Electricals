import React from "react";

const WelcomeLoader = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-black z-50 fixed inset-0">
      <img
        src="/logo.png" // update if needed
        alt="Dhanvarsha Logo"
        className="w-24 h-24 md:w-32 md:h-32 mb-4 animate-pulse"
      />
      <h1 className="text-2xl md:text-4xl font-bold tracking-wider">
        DHANVARSHA ELECTRICALS
      </h1>
      <p className="text-sm md:text-lg text-gray-600 mt-2">
        Powering the Future...
      </p>
    </div>
  );
};

export default WelcomeLoader;
