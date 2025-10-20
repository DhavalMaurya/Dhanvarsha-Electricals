import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-inverse px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-semibold text-inverse mb-3">Dhanvarsha</h2>
          <p className="text-sm">
            Reliable electrical solutions for the industrial sector. Quality,
            safety, and performance — all under one roof.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold text-inverse mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold text-inverse mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>📍  Gujarat, India</li>
            <li>📞 +91-9879444135 , +91 9426404135</li>
            <li>✉️ dhanvarshaele2515@gmail.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        {/* <div>
          <h3 className="text-md font-semibold text-inverse mb-3">Stay Connected</h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded "
            />
            <button className="bg-secondary hover:bg-secondary/90 text-inverse text-sm py-2 px-4 rounded transition-all duration-300">
              Subscribe
            </button>
          </form>
        </div>*/}
      </div> 

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Dhanvarsha Electricals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
