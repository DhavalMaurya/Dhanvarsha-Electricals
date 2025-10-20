import { FaTimes, FaTrash } from "react-icons/fa";
import { deleteProduct } from "../../services/apis/Products";

const DeleteModal = ({ product, onCancel ,fetchProduct}) => {

  const onConfirm = async  () => {
    const response = await deleteProduct(product._id)
    fetchProduct();
    onCancel();
  }


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onCancel}
        >
          <FaTimes />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center mb-4 text-red-600 text-4xl">
          <FaTrash />
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">{product?.name}</span>?
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
