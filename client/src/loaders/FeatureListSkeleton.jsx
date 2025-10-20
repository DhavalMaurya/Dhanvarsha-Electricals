// components/skeletons/FeatureListSkeleton.jsx
import React from "react";

const FeatureListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white shadow rounded-md p-4 flex flex-col space-y-4"
        >
          <div className="h-40 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
};

export default FeatureListSkeleton;
