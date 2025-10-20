import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaRocket,
  FaEye,
  FaHandshake,
  FaCalendar,
  FaBolt,
  FaCheckCircle,
  FaWrench,
  FaRegLightbulb,
  FaUserTie,
  FaBuilding,
  FaQuoteLeft,
} from "react-icons/fa";

// Hero images - replace with actual product/factory photos later
const heroImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
 
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Stats section
  const stats = [
    { icon: <FaCalendar />, label: "Years in Industry", value: 12 },
    { icon: <FaWrench />, label: "Custom Solutions Built", value: 250 },
    { icon: <FaBolt />, label: "Panels Delivered", value: 350 },
    { icon: <FaCheckCircle />, label: "Safety Certifications", value: 15 },
  ];

  // FAQs
  const faqs = [
    {
      q: "Can I get customized solutions?",
      a: "Yes, our team can guide you in selecting the right products as per your specific application and project requirements",
    },
    {
      q: "How long does a typical project take?",
      a: "Standard delivery is between 4–6 weeks, depending on customization, complexity, and volume requirements.",
    },
    {
      q: "How do you ensure product quality?",
      a: "We only source products from trusted manufacturers and brands. Every item is checked to meet industry standards before dispatch..",
    },
   
  ];

  // Clients (optional, can be dynamic)
  const clients = [
    "Client A Logo",
    "Client B Logo",
    "Client C Logo",
    "Client D Logo",
    "Client E Logo",
  ];

  useEffect(() => {
    const cycle = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Carousel */}
      <section className="relative h-[60vh] overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(17, 24, 39, 0.6)",
            }}
          />
        ))}
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            About Dhanvarsha Electricals
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-white/90">
            Delivering precision-engineered electrical systems trusted by
            industries nationwide.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-16">
        {/* Who We Are */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="italic text-sm uppercase text-blue-600">
              Industrial Power Experts ⚡
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
              Who We Are
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Dhanvarsha Electricals is a trusted trader and wholesaler of
              industrial electrical products. We specialize in supplying panel
              accessories, limit switches, contactors, relays, meters, and many
              more essential items for industries and businesses.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our goal is to provide quality products at competitive prices with
              reliable service. With a wide range of stock and a customer-first
              approach, we ensure that our clients get the right solutions for
              their needs. At Dhanvarsha Electricals, we believe in building
              long-term relationships with our customers based on trust,
              quality, and commitment.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our team of skilled engineers and technicians deliver innovative,
              safe, and scalable solutions tailored to meet the evolving needs
              of modern industry.
            </p>
          </div>
          <div>
            <img
              src=" https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
              alt="Factory Operations"
              className="rounded-xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>

        {/* Mission • Vision • Values */}
        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 bg-blue-50">
            <FaRocket className="text-5xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To empower industries through robust, safe, and innovative
              electrical systems that drive efficiency and sustainable growth.
            </p>
          </div>
          <div className="rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 bg-teal-50">
            <FaEye className="text-5xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              We aim to support industries with quality products, competitive prices, and reliable service, while building long-term relationships based on trust and customer satisfaction.
            </p>
          </div>
          <div className="rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-all duration-300 bg-gray-100">
            <FaHandshake className="text-5xl text-blue-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Trusted Quality
            </h3>
            <p className="text-gray-600">
              We Supply only reliable and durable products for industrial use with best quality.
            </p>
          </div>
        </section>

        

        

        {/* FAQ Accordion */}
        <section className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
            Frequently Asked Questions
          </h2>
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-medium text-gray-800">{f.q}</span>
                <span className="text-xl">
                  {expandedFAQ === idx ? "−" : "+"}
                </span>
              </button>
              {expandedFAQ === idx && (
                <div className="p-4 bg-white text-gray-700">{f.a}</div>
              )}
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="text-center py-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg animate-pulse hover:scale-105 transition-all duration-300"
          >
            <FaBolt className="text-lg" />
            Contact Us for a Free Consultation
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
