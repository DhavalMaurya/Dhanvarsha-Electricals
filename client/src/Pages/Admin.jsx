import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../assets/logo1.png"
import { TbCategoryPlus } from "react-icons/tb";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/products", label: "All Products", icon: <FaBoxOpen /> },
    { to: "/admin/enquiry", label: "Enquiries", icon: <FaClipboardList /> },
    { to: "/admin/add-product", label: "Add Products", icon: <FaClipboardList /> },
    { to: "/admin/add-category", label: "Add Category", icon: <TbCategoryPlus /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar Toggle (Mobile) */}
      <div className="lg:hidden absolute top-5 left-5 z-50">
        <button
          className="text-2xl text-cyan-600 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b px-4 pl-10 mb-4">
          <img src={Logo} alt="Dhanvarsha Electricals" className="h-8 mr-2" />
          <span className="text-xl font-bold text-cyan-700 whitespace-nowrap">
            Dhanvarsha 
          </span>
        </div>
        <nav className="px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-cyan-100 text-cyan-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 pl-16 lg:px-10 bg-white border-b shadow-sm z-30">
          <h2 className="text-base font-semibold text-gray-700">
            Welcome Admin
          </h2>
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium transition"
          >
            <FaHome className="text-lg" />
            Home
          </NavLink>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-6 sm:px-8 lg:px-10 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
