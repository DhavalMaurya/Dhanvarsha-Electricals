import { useContext, useState } from "react";
import { FaPlus, FaTimes, FaUpload, FaTag, FaAlignLeft, FaStar } from "react-icons/fa";
import { CategoryContext } from "../../context/Category";
import { toast } from "react-toastify";
import { addProduct } from "../../services/apis/Products";

const AddProduct = () => {
  
  const { allCategory } = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Product Name is required");
    }
    if (!category) {
      return toast.error("Category is required");
    }
    if (!description) {
      return toast.error("Description is required");
    }
    if (!features || features.length === 0) {
      return toast.error("Please add at least one feature");
    }
    if (!image) {
      return toast.error("Product Image is required");
    }
    setLoading(true);
    const response = await addProduct(
      name,
      description,
      features,
      category,
      image
    );

    if (!response.success) {
      e.preventDefault();
      setLoading(false);
      return toast.error(response.message);
    }
    setName("");
    setCategory("");
    setDescription("");
    setFeatures([]);
    setImage("");
    setLoading(false);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen  px-6 sm:px-10 md:px-16 lg:px-24 py-12">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Create a new product entry for your electrical inventory</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8 max-w-4xl">
        
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaTag className="text-indigo-500 text-xs" />
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaAlignLeft className="text-indigo-500 text-xs" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
            >
              <option value="">Select Category</option>
              {allCategory?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaAlignLeft className="text-indigo-500 text-xs" />
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Provide a detailed description of the product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
          />
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaStar className="text-indigo-500 text-xs" />
            Product Features
          </label>
          
          {/* Feature Input */}
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Enter a product feature"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <button
              type="button"
              onClick={addFeature}
              className="bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
            >
              <FaPlus className="text-sm" />
            </button>
          </div>

          {/* Features List */}
          {features.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <p className="text-xs text-gray-500 mb-2">Added Features ({features.length})</p>
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-sm text-gray-800 flex-1">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all duration-200"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaUpload className="text-indigo-500 text-xs" />
            Product Image
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          {image && (
            <p className="text-xs text-green-600 mt-1">
              Selected: {image.name}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Product...
              </span>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
