import React from "react";

const EnquiryForm = ({ handleSubmit, handleOnChange, form, errors }) => {
  
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleOnChange}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleOnChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="example@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="contact"
              value={form.contact}
              onChange={handleOnChange}
              className={`w-full border ${
                errors.contact ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleOnChange}
              className={`w-full border ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="Company Pvt Ltd"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleOnChange}
              rows="4"
              className={`w-full border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              placeholder="Tell us more about your requirement..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleOnChange}
              className={`w-full border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            >
              <option value="">Select your country</option>
              <option value={"India"}>India</option>
              {/* <option value={"USA"}>USA</option>
              <option value={"UK"}>UK</option>
              <option value={"Canada"}>Canada</option>
              <option value={"Australia"}>Australia</option> */}
            </select>
          </div>
        </div>

        <div className="pt-4 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-medium shadow transition-all duration-200"
          >
            Submit Enquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
