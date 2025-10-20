import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User";

const Hero = () => {
  const images = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754144733/WhatsApp_Image_2025-08-02_at_19.49.12_be64a4cc_frej2u.jpg",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754145146/IMG-20250802-WA0008_wblfs2.jpg",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754145146/IMG-20250802-WA0007_sfdwre.jpg",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754145146/IMG-20250802-WA0004_zosagx.jpg",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754145146/IMG-20250802-WA0006_bunavt.jpg",
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754145146/IMG-20250802-WA0003_fx19ot.jpg",
    },
    {
      id: 7,
      image:
        "https://th.bing.com/th/id/OIP.75IVdK3iJyyLTxgdO2tUbAHaFW?r=0&w=1600&h=1157&rs=1&pid=ImgDetMain",
    },
    {
      id: 8,
      image:
        "https://res.cloudinary.com/ddhdbs7xz/image/upload/v1754145146/IMG-20250802-WA0004_zosagx.jpg",
    },
    {
      id: 9,
      image:
        "https://th.bing.com/th/id/OIP.75IVdK3iJyyLTxgdO2tUbAHaFW?r=0&w=1600&h=1157&rs=1&pid=ImgDetMain",
    },
  ];


  return (
    <div className="h-[94vh] bg-light-blue  flex flex-col gap-3 items-center justify-center">
      <h1 className="px-1 text-center varela-round-regular text-3xl  md:text-4xl lg:text-5xl w-[90%]  sm:w-[80%] md:w-[60%] sm:text-4xl  ">
      Professional <span className="text-blue-600  varela-round-regular"> Electrical Solutions</span> for Every Need
      </h1>
      <p className="px-5 text-center text-sm sm:w-[60%] md:w-[40%] ">
        At Dhanvarsha Electricals, we provide top-tier industrial-grade
        electrical products designed for performance and durability. Trust our
        expertise to meet your business needs and drive growth.
      </p>
        <div className="flex justify-center gap-5">
      {/* Explore Products Button */}
      <Link to="/products">
        <button
          className="bg-blue-900 text-white px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm rounded-lg font-semibold hover:scale-105 transition-all duration-300 sm:w-full md:w-auto"
        >
          Explore Products
        </button>
      </Link>

      {/* Get Consultation Button */}
      <Link to={"/cart"}>
        <button
          className="bg-gray-200 text-gray-800 px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm  rounded-lg font-semibold  hover:scale-105 transition-all duration-300 sm:w-full md:w-auto"
        >
          Enquiry Cart
        </button>
      </Link>
    </div>
      <div className="relative w-full overflow-hidden mt-10">
        <div className="flex animate-marquee gap-2">
          {images.concat(images).map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt="image"
              width={240}
              height={144}
              className="w-32 h-24 object-cover sm:w-52 sm:h-32 md:w-60 md:h-36"
            />
          ))}
        </div>
      </div>
      <div className="relative w-full overflow-hidden mt-1">
        <div className="flex animate-marquee-right gap-2">
          {images.concat(images).map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt="image"
              width={240}
              height={144}
              className="w-32 h-24 object-cover sm:w-52 sm:h-32 md:w-60 md:h-36"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
