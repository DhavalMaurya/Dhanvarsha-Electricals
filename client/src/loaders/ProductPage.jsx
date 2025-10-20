import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-lg shadow">
      <div className="w-full h-48 bg-gray-200 rounded-t"></div>
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
