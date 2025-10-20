import React from "react";
import { Link } from "react-router-dom";

const FeatureList = () => {
  const features = [
    {
      title: "Wide Range of Electrical Products",
      desc: "From limit switches, relays, and contactors to panel accessories and meters, we supply everything you need for your industrial and commercial projects.",
      image:
        "https://media.licdn.com/dms/image/v2/D5612AQEOc_EfoJM1fg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1681974750568?e=2147483647&v=beta&t=ZMvaIxoBXWTZogyR3x3VnCQpfAqGFXiYsTUeR_zZIdU ",
    },
    {
      title: "Certified & Reliable Components",
      desc: "Every product is sourced from trusted manufacturers and tested for durability, safety, and performance, ensuring long-lasting operations.",
      image:
        "https://dominionelectric.com/wp-content/uploads/2024/05/man-an-electrical-technician-working-in-a-switchb-2023-11-27-05-02-12-utc-1-1024x683.jpg ",
    },
    {
      title: "Trusted Service & Support",
      desc: "Our expert team provides fast response and reliable guidance, from helping you choose the right products to ensuring on-time delivery.",
      image:
        "https://thumbs.dreamstime.com/b/contact-center-team-working-computers-talking-headset-open-space-office-closeup-service-desk-workers-consulting-online-386395300.jpg ",
    },
  ];

  return (
    <section className="bg-white px-8 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-10 lg:py-20 overflow-hidden">
      {/* Section Header */}
      <div className="text-left mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl w-[90%] lg:w-[70%] font-bold">
          Empowering Industry With Trusted Electrical Solutions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Explore our range of industrial electrical solutions.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mt-10">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-t-xl aspect-video"
              loading="lazy"
            />

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 leading-6">{item.desc}</p>

              {/* CTA Button */}
              <Link
                to="/about-us"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-yellow-500 hover:text-yellow-700 transition-colors"
              >
                Learn More <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureList;
