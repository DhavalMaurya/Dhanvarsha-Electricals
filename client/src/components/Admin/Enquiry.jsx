import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaFilter,
  FaSearch,
  FaEye,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";
import EnquiryDetails from "./EnquiryDetials";
import { getEnquires } from "../../services/apis/Enquiry";

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquires = async () => {
    const response = await getEnquires();
    setEnquiries(response.enquires || []);
    console.log("enquires fetched" ,response.enquires);
  };

  useEffect(() => {
    fetchEnquires();
  }, []);

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDetails(true);
  };

  const formattedDate = (isoDate) =>
    new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statuses = ["All", "Pending", "Responded"];
  const dateOptions = [
    "All",
    "Today",
    "This Week",
    "This Month",
    "Last 30 Days",
  ];

  // Date filtering function
  const filterByDate = (enquiry) => {
    if (dateFilter === "All") return true;

    const enquiryDate = new Date(enquiry.createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (dateFilter) {
      case "Today":
        return enquiryDate >= today;
      case "This Week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        return enquiryDate >= weekStart;
      case "This Month":
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        return enquiryDate >= monthStart;
      case "Last 30 Days":
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return enquiryDate >= thirtyDaysAgo;
      default:
        return true;
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus =
      statusFilter === "All" ||
      enq.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesSearch =
      enq.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      enq.companyName?.toLowerCase().includes(search.toLowerCase());

    const matchesDate = filterByDate(enq);

    return matchesStatus && matchesSearch && matchesDate;
  });

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Customer Enquiries
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track customer product enquiries
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="text-sm text-gray-500">
              Showing {filteredEnquiries.length} of {enquiries.length} enquiries
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by customer or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-4 py-3 text-sm border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px] bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Status" : status}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-9 pr-4 py-3 text-sm border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px] bg-white"
              >
                {dateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry List */}
      <div className="space-y-4">
        {filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Customer Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full items-center justify-center text-white font-semibold text-lg">
                        {enquiry.customerName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {enquiry.customerName || "N/A"}
                          </h3>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              enquiry.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                : "bg-green-100 text-green-800 border border-green-200"
                            }`}
                          >
                            {enquiry.status}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <FaBuilding className="text-gray-400" />
                            {enquiry.companyName}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            {formattedDate(enquiry.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleView(enquiry)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
                    >
                      <FaEye className="text-sm" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow">
                      <FaTrash className="text-sm" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No enquiries found
              </h3>
              <p className="text-gray-500">
                {search || statusFilter !== "All" || dateFilter !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "No enquiries have been submitted yet."}
              </p>
              {(search || statusFilter !== "All" || dateFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setDateFilter("All");
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <EnquiryDetails
            enquiryId={selectedEnquiry._id}
            onClose={() => setShowDetails(false)}
            fetchEnquires={fetchEnquires}
          />
        </div>
      )}
    </div>
  );
};

export default Enquiry;
