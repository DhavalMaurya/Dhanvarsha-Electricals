import { Link } from "react-router-dom";

const FeatureProduct = () => {
  
  const categories = [
    {
      id: 1,
      title: "Switches & Sockets",
      description: "Premium quality switches and sockets for all applications",
      image:
        "https://thumbs.dreamstime.com/b/switches-industrial-control-board-lamp-indicator-switch-power-panel-186867607.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Wires & Cables",
      description:
        "High-grade electrical wires and cables for safe installations",
      image:
        " https://www.kei-ind.com/wp-content/uploads/2023/06/power-cables-and-their-various-types.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Circuit Breakers",
      description: "Reliable protection devices for electrical circuits",
      image:
        " https://www.allenservice.com/wp-content/uploads/2024/06/Close-up-of-circuit-breaker-480x330-1.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "Controllers",
      description: "Every Range and multi functional.",
      image:
        " https://5.imimg.com/data5/SELLER/Default/2024/6/426691772/LP/RR/KH/217361278/duplex-building-electrical-works-services.jpg",
      link: "#",
    },
  ];

  return (
    <div className="bg-white px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-10">
      {/* Header Section */}
      <div className="mb-8">
        <span className="text-sm text-cyan-700 font-medium">Quality</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mt-2">
          Featured Product Categories
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Explore our range of industrial electrical solutions.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all flex flex-col h-full"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {category.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {category.description}
              </p>
              <Link
                to={"/products"}
                className="text-blue-500 hover:text-blue-700 inline-flex items-center mt-auto text-xs sm:text-sm"
              >
                View Products →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="mt-8 flex justify-center">
        <Link to={"/products"}>
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 sm:w-full md:w-auto">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureProduct;
