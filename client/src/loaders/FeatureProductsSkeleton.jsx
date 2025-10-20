import React from "react";

const FeatureProductsSkeleton = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white shadow rounded-md p-3 sm:p-4 h-60 sm:h-72 md:h-80 lg:h-96 animate-pulse"
        >
          <div className="w-full h-[70%] bg-gray-300 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureProductsSkeleton;
