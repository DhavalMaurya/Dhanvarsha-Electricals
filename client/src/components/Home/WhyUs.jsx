import React from "react";

const WhyUs = () => {
  const values = [
    {
      id: 1,
      title: "Our Mission",
      description:
        "To provide innovative, reliable, and cost-effective electrical solutions that power India's growth while maintaining the highest standards of quality and safety.",
      icon: (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.069-3.292z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Our Vision",
      description:
        "To become India's most trusted electrical solutions partner, leading the industry through innovation, sustainability, and exceptional customer service.",
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H3a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Our Values",
      description:
        "Quality, integrity, innovation, and customer satisfaction drive everything we do. We believe in building lasting relationships through excellence.",
      icon: (
        <svg
          className="w-8 h-8 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 18.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
          <path d="M10 2.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className=" flex sm:gap-10 items-center flex-col py-16 sm:py-25 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
      {/* Header Section */}
      <div className="mb-8 text-left w-full">
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-gray-800 w-full">
          Why Choose <span className="text-blue-600"> Dhanvarsha Electricals</span> ?
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Built on trust, powered by innovation, and committed to excellence in every
          electrical solution we deliver.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {values.map((value) => (
          <div
            key={value.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              {value.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h2>
            <p className="text-sm text-gray-600 text-center">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;