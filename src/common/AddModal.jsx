import React, { useState, useEffect, useMemo } from "react";
import { IoClose } from "react-icons/io5";

const USER_API = import.meta.env.VITE_API_URL;

const AddModal = ({ open, setOpen, product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Reset modal state when `open` or `product._id` changes
  useEffect(() => {
    if (open && product) {
      setSelectedSize(product?.sizes?.[0] || null); // Default to the first size, if available
      setSelectedExtras([]);
      setQuantity(1);
    }
  }, [open, product?._id]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    const basePrice = selectedSize?.price || product?.price || 0;
    const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    return (basePrice + extrasPrice) * quantity;
  }, [product, selectedSize, selectedExtras, quantity]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      selectedSize,
      selectedExtras,
      quantity,
    };
    onAddToCart(itemToAdd);
    setOpen(false);
  };

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative"
        style={{
          width: "90%",
          maxWidth: "400px",
          height: "90%",
          maxHeight: "600px",
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-700 hover:text-red-500 z-50"
          onClick={() => setOpen(false)}
        >
          <IoClose size={24} />
        </button>

        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={`${USER_API.replace("/api", "")}${product.image}`}
            alt={product.name}
            className="h-40 w-full object-cover"
          />
        </div>

        {/* Content Section with Scrollability */}
        <div
          className="p-4 overflow-y-auto flex-grow"
          style={{
            maxHeight: "calc(100% - 100px)", // Ensure space for the close button
          }}
        >
          {/* Product Name */}
          <h2 className="text-lg font-semibold text-center text-dark mb-2">
            {product.name}
          </h2>

          {/* Product Description */}
          <p className="text-sm text-gray-600 text-center mb-4">
            {product.description}
          </p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold mb-2">Available Sizes</h3>
              <div className="space-y-2">
                {product.sizes.map((size) => (
                  <button
                    key={size._id}
                    className={`w-full py-2 px-3 text-left border rounded-lg transition ${
                      selectedSize?._id === size._id
                        ? "bg-pink-300 text-white"
                        : "hover:bg-pink-200 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.size} - {size.price} OXOF
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {product.extras?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold mb-2">Available Extras</h3>
              <div className="space-y-2">
                {product.extras.map((extra) => (
                  <button
                    key={extra._id}
                    className={`w-full py-2 px-3 text-left border rounded-lg transition ${
                      selectedExtras.some((ex) => ex._id === extra._id)
                        ? "bg-pink-300 text-white"
                        : "hover:bg-pink-200 hover:text-gray-900"
                    }`}
                    onClick={() => {
                      setSelectedExtras((prev) =>
                        prev.some((ex) => ex._id === extra._id)
                          ? prev.filter((ex) => ex._id !== extra._id)
                          : [...prev, extra]
                      );
                    }}
                  >
                    {extra.name} - {extra.price} OXOF
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4 flex items-center gap-4">
            <button
              className="px-4 py-2 text-sm font-bold border rounded-full hover:bg-pink-200 hover:text-gray-900"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-4 py-2 text-sm font-bold border rounded-full hover:bg-pink-200 hover:text-gray-900"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <h3 className="text-lg font-bold">
              Total: {totalPrice.toFixed(2)} OXOF
            </h3>
          </div>

          {/* Add to Cart */}
          <button
            className="w-full py-2 text-white bg-pink-300 rounded-lg text-sm font-bold transition hover:bg-pink-400"
            onClick={handleAddToCart}
          >
            Add to Cart - {totalPrice.toFixed(2)} OXOF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
