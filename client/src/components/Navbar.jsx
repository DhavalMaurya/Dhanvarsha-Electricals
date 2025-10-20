import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

// Icons
import {
  FaHome,
  FaBoxOpen,
  FaAddressCard,
  FaShoppingCart,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

// Context
import { CartContext } from "../context/Cart";
import { UserContext } from "../context/User";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, token } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartItems = cart?.length || 0;

  // Nav Links
  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen /> },
    { name: "About Us", path: "/about-us", icon: <FaAddressCard /> },
    { name: "Admin", path: "/admin", icon: <RiAdminFill /> },
  ];

  // Cart Icon with Badge
  const CartIcon = () => (
    <div className="relative">
      <FaShoppingCart className="text-xl" />
      {totalCartItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
          {totalCartItems > 99 ? "99+" : totalCartItems}
        </span>
      )}
    </div>
  );

  return (
    <nav
      className="bg-white border-b border-gray-200 shadow-sm z-10"
      style={{ height: "64px" }}
    >
      <div className="w-full mx-auto  px-4 sm:px-9 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Logo" className="w-20 h-auto" />
            <div className="flex flex-col">
              <h1 className="text-sm md:text-base lg:text-lg font-bold text-blue-700 group-hover:text-blue-500 transition-colors">
                Dhanvarsha Electricals
              </h1>
              <span className="text-[10px] md:text-xs text-gray-600">
                Your Trusted Electrical Partner
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {/* Desktop Menu */}
            <ul className="hidden sm:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.name == "Admin") {
                  if (!token || !user?.role == "admin") {
                    return;
                  }
                }
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-1 text-gray-700 hover:text-blue-600 text-sm font-medium transition"
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Always show cart on desktop */}
              <li>
                <Link
                  to="/cart"
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                  aria-label="Cart"
                >
                  <CartIcon />
                </Link>
              </li>
            </ul>
            <div className="sm:hidden"></div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 sm:hidden">
            <Link to="/cart" className="text-gray-700">
              <CartIcon />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-gray-700 focus:outline-none"
              aria-label="Open menu"
            >
              <IoMdMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative w-3/4 bg-blue-800 text-white h-full shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-blue-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-gray-200"
                  aria-label="Close menu"
                >
                  <IoCloseSharp size={24} />
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="p-6 space-y-6">
              {navLinks.map((link) => {
                if (link.name == "Admin") {
                  if (!token || !user?.role == "admin") {
                    return;
                  }
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center gap-3 text-lg hover:text-blue-200 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              {/* Always show cart on mobile */}
              <Link
                to="/cart"
                className="flex items-center gap-3 text-lg hover:text-blue-200"
                onClick={() => setMenuOpen(false)}
              >
                <CartIcon />
                <span>Cart ({totalCartItems})</span>
              </Link>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-700 bg-blue-900">
              <p className="text-sm text-center text-blue-200">
                © {new Date().getFullYear()} Dhanvarsha Electricals
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
