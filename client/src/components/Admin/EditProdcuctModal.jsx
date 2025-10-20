import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { editProduct, getProductDetails } from "../../services/apis/Products";
import { useEffect } from "react";
import { CategoryContext } from "../../context/Category";
import { useContext } from "react";
import { toast } from "react-toastify";

const EditProductModal = ({ productId, onClose, fetchProduct }) => {
  const { allCategory } = useContext(CategoryContext);
  
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState();
  const [isImageUpdate, setIsImageUpdate] = useState(false);
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  const fetchProductDetails = async () => {
    const response = await getProductDetails(productId);

    setProduct(response.product);
    setProductName(response.product.name);
    setDescription(response.product.description);
    setFeatures(response.product.features);
    setCurrentImage(response.product.images[0]);

  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName) {
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
    if (!currentImage) {
      return toast.error("Product Image is required");
    }

    const response = await editProduct(
      productName,
      description,
      features,
      category,
      isImageUpdate ? currentImage : null,
      product._id
    );

    fetchProduct();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-cyan-500"
            >
              <option value={null}>Select Category</option>
              {allCategory?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add new feature"
                className="flex-1 border border-gray-300 rounded p-2 text-sm"
              />
              <button
                type="button"
                onClick={addFeature}
                className="bg-cyan-600 text-white px-3 py-2 rounded text-sm hover:bg-cyan-700"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center text-sm bg-gray-50 px-3 py-1 rounded"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="text-red-500 text-xs hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            {currentImage && (
              <img
                src={
                  currentImage
                    ? currentImage instanceof File
                      ? URL.createObjectURL(currentImage) // If image is File, show preview
                      : currentImage // Else, it's already a URL string from backend
                    : ""
                }
                alt="productImage"
                className="w-16 m-5"
              />
            )}
            <input
              type="file"
              onChange={(e) => {
                setIsImageUpdate(true);
                setCurrentImage(e.target.files[0]);
              }}
              className="w-full text-sm"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
