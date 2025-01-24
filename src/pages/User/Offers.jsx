import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../Redux/Products/productSlice.js";
import AddModal from "../../common/AddModal";
import { addToCart } from "../../Redux/Cart/cartSlice";

const USER_API = import.meta.env.VITE_API_URL;

const Offers = () => {
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Filter products to get only dishes of the day
  const dishes = Array.isArray(products.data)
    ? products.data.filter((product) => product.isDishOfTheDay)
    : [];

  // Add to cart function
  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch item to the cart
    setOpen(false); // Close the modal
  };

  const handleOpenModal = () => {
    setSelectedDish(dishes[currentIndex]);
    setOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000);
    return () => clearInterval(intervalId);
  }, [dishes]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (dishes.length === 0) {
    return <div>No dishes of the day available.</div>;
  }

  const currentDish = dishes[currentIndex];
  const imageURL =
    currentDish.image
      ? `${USER_API.replace("/api", "")}${currentDish.image}`
      : "/path/to/fallback/image.jpg"; // Fallback image

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-12">
        <div className="container mx-auto px-0 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Our Specialties of the Day
          </h1>
          <p className="text-lg text-gray-600 text-center mt-4">
            Discover our delicious daily specials, carefully prepared by our
            chefs to offer you a unique culinary experience.
          </p>
        </div>

        {/* AddModal Integration */}
        {selectedDish && (
          <AddModal
            open={open}
            setOpen={setOpen}
            product={selectedDish}
            onAddToCart={handleAddToCart} // Pass the addToCart handler
          />
        )}

        <div className="container mx-auto px-0">
          <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-xl mx-auto">
            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <img
                src={imageURL}
                alt={currentDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {currentDish.name}
                  </h1>
                  <p className="text-lg opacity-90">Plat du Jour</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                &larr;
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                &rarr;
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {currentDish.description || "No description available."}
                  </p>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-[#f253aa] mb-2">
                      {currentDish.price}
                    </div>
                    <p className="text-gray-500">Prix spécial du jour</p>
                  </div>

                  <div className="space-y-4">
                    <button
                      className="w-full h-12 bg-[#f253aa] hover:bg-[#f253aa]/90 text-white"
                      onClick={handleOpenModal}
                    >
                      Commander Maintenant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Offers;
