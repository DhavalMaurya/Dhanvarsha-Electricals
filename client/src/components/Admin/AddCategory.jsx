import React, { useState } from "react";
import { FaTag, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { addCategory } from "../../services/apis/Category";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      return toast.error("Category name is required");
    }

    setLoading(true);

    const response = await addCategory(categoryName);
    if (!response.success) {
      return setLoading(false);;
    }
    // Reset form
    setCategoryName("");
    setDescription("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen  px-6 sm:px-10 md:px-16 lg:px-24 py-12">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Add New Category
        </h1>
        <p className="text-gray-600">
          Create a new product category for your electrical inventory
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {/* Category Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaTag className="text-indigo-500 text-xs" />
            Category Name
          </label>
          <input
            type="text"
            placeholder="Enter category name (e.g., Switches & Sockets)"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Description (Optional) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaPlus className="text-indigo-500 text-xs" />
            Description{" "}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows="3"
            placeholder="Brief description of the category"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
          />
        </div>

        {/* Category Preview */}
        {categoryName && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-indigo-700 mb-2">
              Category Preview
            </h3>
            <div className="flex items-center gap-2">
              <FaTag className="text-indigo-500 text-sm" />
              <span className="text-indigo-800 font-medium">
                {categoryName}
              </span>
            </div>
            {description && (
              <p className="text-indigo-600 text-sm mt-2">{description}</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading || !categoryName.trim()}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Category...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FaPlus className="text-sm" />
                Add Category
              </span>
            )}
          </button>
        </div>

        {/* Helper Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">
            💡 Tips for Category Names
          </h3>
          <ul className="text-blue-600 text-sm space-y-1">
            <li>• Use clear, descriptive names</li>
            <li>• Keep names concise but specific</li>
            <li>
              • Examples: "LED Lighting", "Circuit Breakers", "Wires & Cables"
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
