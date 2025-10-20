import React from "react";
import Navbar from "../components/Navbar";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaCommentDots
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">

      <section className="container mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-700">Get in Touch</h1>
          <p className="text-gray-600 mt-2">
            We'd love to hear about your next project or question.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-blue-600 text-2xl" />
              <div>
                <h3 className="font-bold">Address</h3>
                <p>
                  Dhanvarsha Electricals Pvt Ltd, Industrial Estate,
                  Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-blue-600 text-2xl" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p>support@dhanvarshaelectricals.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b pb-3">
              <FaUser className="text-blue-600" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <FaEnvelope className="text-blue-600" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-3 border-b pb-3">
              <FaPhoneAlt className="text-blue-600" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-start gap-3 border-b pb-3">
              <FaCommentDots className="text-blue-600 mt-1" />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;