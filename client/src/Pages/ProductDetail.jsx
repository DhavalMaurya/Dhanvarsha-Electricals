import { useContext, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaRegHeart,
  FaHeart,
  FaShare,
  FaBox,
  FaShippingFast,
  FaShieldAlt,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetails } from "../services/apis/Products";
import { getSimilarProduct } from "../services/apis/Category";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/Cart";

const ProductDetail = () => {
  /* ─────────────────────────── state / context ─────────────────────────── */
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilar] = useState([]);

  const [imgIndex, setImgIndex] = useState(0);
  const [imgModal, setImgModal] = useState(false);
  const [tab, setTab] = useState("features");
  const [nameLimit, setNameLimit] = useState(() =>
    Math.floor(window.innerWidth / 25)
  );

  /* ─────────────────────────── helpers ─────────────────────────── */
  const sliceName = (n) =>
    n.length > nameLimit ? n.slice(0, nameLimit) + "…" : n;

  const nextImg = () =>
    setImgIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));
  const prevImg = () =>
    setImgIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));



  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // optionally show toast: “Link copied”
    }
  };

  /* ─────────────────────────── data fetching ─────────────────────────── */
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await getProductDetails(productId);
      if (res.success) {
        setProduct(res.product);
        const sim = await getSimilarProduct(res.product.category._id);
        setSimilar(sim.products || []);
      }
    };
    fetchDetails();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  /* responsive truncation */
  useEffect(() => {
    const onResize = () => setNameLimit(Math.floor(window.innerWidth / 25));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ─────────────────────────── loading state ─────────────────────────── */
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  /* ─────────────────────────── component ─────────────────────────── */
  return (
    <div className="bg-[#ffffff] pb-20">
      {/* main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* image + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* image gallery */}
          <div>
            {/* main image */}
            <div className="relative bg-white rounded-2xl overflow-hidden">
              <img
                src={product.images[imgIndex]}
                alt={product.name}
                className="w-full h-[420px] object-contain p-10 transition-transform duration-300"
              />

              {/* gallery controls (shown if >1 img) */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    <FaChevronLeft className="text-gray-600" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    <FaChevronRight className="text-gray-600" />
                  </button>
                </>
              )}

              {/* zoom */}
              <button
                onClick={() => setImgModal(true)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <FaExpand className="text-gray-600" />
              </button>

              {/* badge */}
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Premium
              </div>
            </div>

            {/* thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 mt-4 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImgIndex(idx)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition ${
                      idx === imgIndex
                        ? "border-indigo-600 ring-2 ring-indigo-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* text + actions (flat, no card) */}
          <div className="space-y-8">
            {/* header */}
            <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                {product.category.name}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={share}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaShare className="text-gray-400" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <p className="text-gray-700">{product.description}</p>

            {/* trust badges (flat row) */}
            <div
              className="flex 
            flex-row justify-between gap-6 py-4"
            >
              <div className="flex flex-col items-center text-center">
                <FaShieldAlt className="text-green-500 text-2xl mb-1" />
                <p className="text-sm font-semibold">Quality Assured</p>
                <p className="text-xs text-gray-500">Premium materials</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaShippingFast className="text-blue-500 text-2xl mb-1" />
                <p className="text-sm font-semibold">Fast Delivery</p>
                <p className="text-xs text-gray-500">Pan-India</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaBox className="text-purple-500 text-2xl mb-1" />
                <p className="text-sm font-semibold">Bulk Orders</p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4">
              <button
                onClick={() => addToCart(product)}
                className="w-full  bg-blue-900 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition transform"
              >
                Add to Enquiry Cart
              </button>
              <button className="w-full flex items-center justify-center border-2 border-blue-900 text-blue-900 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                <FaDownload className="mr-2" />
                Download Datasheet
              </button>
            </div>
          </div>
        </div>

        {/* tabs (flat) */}
        <div>
          <nav className="flex space-x-10 border-b border-gray-200 mb-6">
            {["features", "specifications"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-b-2 border-blue-900 text-blue-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>

          {tab === "features" && (
            <div className="grid md:grid-cols-2 gap-6">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <FaCheckCircle className="text-blue-900 mt-1" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "specifications" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500">Model Number</p>
                <p className="font-semibold">{product.model || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-semibold">{product.category.name}</p>
              </div>
              {/* add more specs as needed */}
            </div>
          )}
        </div>

        {/* similar products */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              You May Also Like
            </h2>
            <button
              onClick={() => navigate("/products")}
              className="text-blue-500 hover:text-blue-900 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {similarProducts.slice(0, 5).map((p) => (
              <ProductCard key={p._id} product={p} nameSlice={sliceName} />
            ))}
          </div>
        </section>
      </div>

      {/* full-screen image */}
      {imgModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={product.images[imgIndex]}
              alt={product.name}
              className="max-w-full max-h-screen object-contain"
            />
            <button
              onClick={() => setImgModal(false)}
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
