import { FaTimes, FaWhatsapp } from "react-icons/fa";

import { getEnquiryDetails, updateStatus } from "../../services/apis/Enquiry";
import { useEffect, useState } from "react";

// Helper to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const EnquiryDetails = ({ enquiryId, onClose, fetchEnquires }) => {
  const [enquiry, setEnquiry] = useState(null);

  const getDetails = async () => {
    const response = await getEnquiryDetails(enquiryId);
    setEnquiry(response.enquiry);
  };

  const handleStatusToggle = async () => {
    const response = await updateStatus(enquiryId);

    if (!response.success) {
      return;
    }
    getDetails();
    await fetchEnquires();
  };

  useEffect(() => {
    getDetails();
  }, [enquiryId]);

  useEffect(() => {
    console.log("yha", enquiry);
  }, [enquiry]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Enquiry Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {/* User Info */}
          <div>
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-gray-800">{enquiry?.customerName}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">{enquiry?.customerName}</p>
          </div>

          {/* New: Contact Number */}
          <div>
            <p className="text-gray-600 font-semibold">Phone:</p>
            <p className="text-gray-800">
              {enquiry?.customerContact || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Company:</p>
            <p className="text-gray-800">{enquiry?.companyName}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Submitted On:</p>
            <p className="text-gray-800">{formatDate(enquiry?.createdAt)}</p>
          </div>

          {/* Products */}
          <div className="sm:col-span-2">
            <p className="text-gray-600 font-semibold">Products:</p>
            <ul className="mt-2 space-y-3">
              {enquiry?.products.map((item, idx) => (
                <li key={idx} className="flex gap-4 border-b pb-2">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity}
                    </p>
                    {item.message && (
                      <p className="text-gray-600 text-sm">
                        Note: {item.message}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <p className="text-gray-600 font-semibold">Status:</p>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                // isPending
                enquiry?.status == "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {enquiry?.status.charAt(0).toUpperCase() +
                enquiry?.status.slice(1)}
            </span>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <p className="text-gray-600 font-semibold">Message:</p>
            <p className="text-gray-800 mt-1">
              {enquiry?.message || "No message provided"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleStatusToggle}
            className={`px-6 py-2 text-sm rounded font-medium transition ${
              // isPending
              enquiry?.status == "pending"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            {enquiry?.status == "pending"
              ? "Mark as Responded"
              : "Mark as Pending"}
          </button>
          <div className="flex gap-5">
            <a
              href={`https://api.whatsapp.com/send/?phone=${enquiry?.customerContact}&text&type=phone_number&app_absent=0`}
              target="_blank"
            >
              <button className="flex gap-2 justify-center items-center px-6 py-2 text-sm bg-gray-300 text-green-600 rounded hover:bg-gray-400 ">
                <FaWhatsapp className="text-green-600" /> Open WhatsApp
              </button>
            </a>
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetails;
