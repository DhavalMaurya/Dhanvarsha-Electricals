import image1 from "../../assets/logos/logo1.png";
import image2 from "../../assets/logos/logo2.png";
import image3 from "../../assets/logos/logo3.png";
import image4 from "../../assets/logos/logo4.png";
import image5 from "../../assets/logos/logo5.png";
import image6 from "../../assets/logos/logo6.png";
import image7 from "../../assets/logos/logo7.png";
import image8 from "../../assets/logos/logo8.png";
import image9 from "../../assets/logos/logo9.png";
import image10 from "../../assets/logos/logo10.png";
import image11 from "../../assets/logos/logo11.png";

const logos = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
];

const TrustedBy = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 bg-light-blue  overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10 px-4 sm:px-0">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Trusted by Industry Leaders
        </h2>
        <div className="mx-auto h-1 w-20 sm:w-24 bg-cyan-500 rounded-full"></div>
      </div>

      {/* Logos Carousel */}
      <div className="relative w-full">
        {/* Background Gradients */}
        <div className="absolute left-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-r from-cyan-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-12 sm:w-16 bg-gradient-to-l from-cyan-50 to-transparent z-10"></div>

        {/* Marquee Animation */}
        <div
          className="animate-marquee whitespace-nowrap flex items-center gap-8 sm:gap-12 overflow-hidden"
          style={{ animationDuration: "30s", animationTimingFunction: "linear" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Client logo ${index + 1}`}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto min-w-[80px] max-w-[160px] object-contain transition-transform duration-300 ease-in-out"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;