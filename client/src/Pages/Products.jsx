import { useContext, useEffect, useState } from "react";
import ProductSkeleton from "../loaders/ProductPage";
import ProductCard from "../components/ProductCard";
import { FiSearch } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { CategoryContext } from "../context/Category";
import { getAllProducts } from "../services/apis/Products";

const Products = () => {
  const nameSlice = (name) => {
    const nameLimit = 20;
    return name.length > nameLimit ? name.slice(0, nameLimit) + "..." : name;
  };

  const { allCategory } = useContext(CategoryContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(
        selectedCategory,
        limit,
        page,
        search
      );
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      // Debounce search
      const searchTimeout = setTimeout(() => {
        fetchProduct();
      }, 700);

      return () => clearTimeout(searchTimeout);
    } else {
      // Immediate fetch for category/pagination changes
      fetchProduct();
    }
  }, [selectedCategory, limit, page, search]);

  return (
    <div className="min-h-screen bg-light-blue">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="text-left mb-10">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore high-performance electrical solutions from Dhanvarsha
            Electricals
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <FiSearch className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Filters Group */}
          <div className="flex justify-between shrink-0 items-center gap-3">
            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-2.5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setPage(1);
                  setSelectedCategory(e.target.value);
                }}
                className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="All">All</option>
                {allCategory?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Per Page Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-2.5 text-gray-400" />
              <select
                value={limit}
                onChange={(e) => {
                  setPage(1);
                  setLimit(e.target.value);
                }}
                className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading
            ? Array.from({ length: 10 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))
            : products?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  nameSlice={nameSlice}
                />
              ))}
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-center items-center gap-2 mt-10">
          {loading ? (
            ""
          ) : (
            <>
              <button
                onClick={() => {
                  if (currentPage === 1) return;
                  setPage(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }}
                className={`px-4 py-2 text-sm rounded-lg shadow-md transition bg-white border text-gray-700 hover:bg-gray-100 `}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => {
                if(idx < 2){}
                return (
                <button
                  key={idx}
                  onClick={() => {
                    setPage(idx + 1);
                    setCurrentPage(idx + 1);
                  }}
                  className={`px-4 py-2 text-sm rounded-lg shadow-md transition ${
                    currentPage === idx + 1
                      ? "bg-cyan-600 text-white"
                      : "bg-white border text-gray-700 hover:bg-gray-100"
                  } `}
                >
                  {idx + 1}
                </button>
              )})}
              <button
                onClick={() => {
                  if (currentPage === totalPages) return;
                  setPage(currentPage + 1);
                  setCurrentPage(currentPage + 1);
                }}
                className={`px-4 py-2 text-sm rounded-lg shadow-md transition bg-white border text-gray-700 hover:bg-gray-100 `}
              >
                Next
              </button>
            </>
          )}
        </div> */}


      <div className="flex justify-center items-center gap-1 mt-10 overflow-x-auto px-2 whitespace-nowrap">
  {loading ? (
    ""
  ) : (
    <>
      {/* Previous Button */}
      <button
        onClick={() => {
          if (currentPage === 1) return;
          setPage(currentPage - 1);
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`px-3 py-2 text-xs sm:text-sm rounded-md sm:rounded-lg shadow transition bg-white border text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Pagination Numbers with Ellipsis */}
      {Array.from({ length: totalPages }).map((_, idx) => {
        const page = idx + 1;
        // Show first, last, current, +/-2
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 && page <= currentPage + 2)
        ) {
          return (
            <button
              key={page}
              onClick={() => {
                setPage(page);
                setCurrentPage(page);
              }}
              className={`px-3 py-2 text-xs sm:text-sm rounded-md sm:rounded-lg shadow transition ${
                currentPage === page
                  ? "bg-cyan-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        }
        // Add ellipsis before/after when needed
        if (
          page === currentPage - 3 ||
          page === currentPage + 3
        ) {
          return (
            <span key={page} className="px-2 text-gray-400 select-none">...</span>
          );
        }
        return null;
      })}

      {/* Next Button */}
      <button
        onClick={() => {
          if (currentPage === totalPages) return;
          setPage(currentPage + 1);
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 text-xs sm:text-sm rounded-md sm:rounded-lg shadow transition bg-white border text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        Next
      </button>
    </>
  )}
</div>



      </div>
    </div>
  );
};

export default Products;
