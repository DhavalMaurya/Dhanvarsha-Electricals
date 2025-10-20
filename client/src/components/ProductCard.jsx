import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/Cart";

const ProductCard = ({ product, nameSlice }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="relative bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 group overflow-hidden flex flex-col h-full">
      {/* Product Image */}

        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover max-h-full max-w-full h-40 sm:h-44 md:h-48 lg:h-52  "
          loading="lazy"
        />
      {/* </div> */}

      {/* Product Info */}
      <div className="p-3 sm:p-4 space-y-2 flex flex-col justify-between flex-grow min-h-[100px]">
        <p className="text-[9px] sm:text-[10px] uppercase text-gray-500 tracking-wider truncate">
          {product.category?.name || "Uncategorized"}
        </p>
        <h3 className="text-sm font-semibold text-gray-800 leading-tight">
          {nameSlice(product.name)}
        </h3>
        <Link
          to={`/product-detail/${product._id}`}
          className="mt-auto text-xs sm:text-sm text-cyan-600 hover:text-cyan-700 hover:underline transition"
        >
          View Details →
        </Link>
      </div>

      {/* Always Visible Cart Button */}
      <button
        onClick={() => addToCart(product)}
        aria-label="Add to cart"
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-2 sm:p-3 shadow-lg z-10 transition-transform transform hover:scale-105 active:scale-95"
      >
        <FaShoppingCart size={16} />
      </button>
    </div>
  );
};

export default ProductCard;