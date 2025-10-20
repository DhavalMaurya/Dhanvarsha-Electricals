import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import EditProductModal from "./EditProdcuctModal";
import DeleteModal from "./DeleteModal";
import { getAllProducts } from "../../services/apis/Products";
import { CategoryContext } from "../../context/Category";

const AllProducts = () => {
  const { allCategory } = useContext(CategoryContext);

  // State management (similar to main Products page)
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products with pagination, search, and category filter
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(selectedCategory, limit, page, search);
      setProducts(response.products || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  // Combined useEffect for all filters (same logic as main Products page)
  useEffect(() => {
    if (search) {
      setSearchLoading(true);
      const searchTimeout = setTimeout(() => {
        fetchProduct();
      }, 700);
      
      return () => clearTimeout(searchTimeout);
    } else {
      fetchProduct();
    }
  }, [selectedCategory, limit, page, search]);

  // Modal handlers
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleEditClick = (productId) => {
    setSelectedProduct(productId);
    setShowModal(true);
  };

  // Refresh data after edit/delete
  const refreshProducts = () => {
    fetchProduct();
  };

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-36 min-h-screen ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <div className="text-sm text-gray-500">
          Total: {loading ? "Loading..." : products.length} products
        </div>
      </div>

      {/* Enhanced Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {searchLoading && (
            <div className="absolute right-3 top-3.5">
              <div className="animate-spin h-4 w-4 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex gap-3 shrink-0">
          {/* Category Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setPage(1);
                setSelectedCategory(e.target.value);
              }}
              className="pl-9 pr-4 py-3 text-sm border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[140px]"
            >
              <option value="All">All Categories</option>
              {allCategory?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Show Per Page Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              className="pl-9 pr-4 py-3 text-sm border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[120px]"
            >
              <option value={5}>Show 5</option>
              <option value={10}>Show 10</option>
              <option value={20}>Show 20</option>
              <option value={50}>Show 50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-cyan-50">
            <tr>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">
                Image
              </th>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">
                Name
              </th>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">
                Category
              </th>
              <th className="px-4 py-4 text-left text-gray-700 font-semibold">
                Date Added
              </th>
              <th className="px-4 py-4 text-center text-gray-700 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              // Loading skeleton rows
              Array.from({ length: limit }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                  </td>
                </tr>
              ))
            ) : products.length > 0 ? (
              products.map((item, i) => (
                <tr key={item._id || i} className="hover:bg-cyan-50 transition">
                  <td className="px-4 py-4">
                    <img
                      src={item.images?.[0] || "/placeholder-image.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border border-gray-200"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </td>
                  <td className="px-4 py-4 text-gray-800 font-medium">
                    <div className="max-w-xs truncate">{item.name}</div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">
                    <span className="inline-flex px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                      {item.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {item.createdAt 
                      ? new Date(item.createdAt).toLocaleDateString("en-GB")
                      : "N/A"
                    }
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(item._id)}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded transition"
                        title="Edit Product"
                      >
                        <FaEdit className="text-sm" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded transition"
                        title="Delete Product"
                      >
                        <FaTrash className="text-sm" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Empty state
              <tr>
                <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                  {search ? (
                    <div>
                      <p className="mb-2">No products found for "{search}"</p>
                      <button
                        onClick={() => setSearch("")}
                        className="text-cyan-600 hover:text-cyan-500 underline"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    "No products available"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination */}
      {!loading && products.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-500">
            Showing page {page} of {totalPages}
          </div>
          
          <div className="flex gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-2 text-sm rounded border transition ${
                page === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (page <= 3) {
                pageNum = idx + 1;
              } else if (page > totalPages - 3) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = page - 2 + idx;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 text-sm rounded border transition ${
                    page === pageNum
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-2 text-sm rounded border transition ${
                page === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <EditProductModal
          productId={selectedProduct}
          onClose={() => setShowModal(false)}
          fetchProduct={refreshProducts}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          product={selectedProduct}
          fetchProduct={refreshProducts}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default AllProducts;

