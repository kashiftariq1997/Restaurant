import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import AddModal from "../../common/AddModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/cartSlice";
import Loader from "../../common/Loader";

const USER_API = import.meta.env.VITE_API_URL;

const FeaturedCard = ({ items, status }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch the item to the cart
  };

  const handleAdd = (item) => {
    setSelectedProduct(item);
    setOpen(true); // Open the modal
  };

  const handleInfo = (item) => {
    setSelectedProduct(item);
    setOpen(true); // Open the modal to show product info
  };

  return (
    <>
      {/* AddModal */}
      <AddModal
        open={open}
        setOpen={setOpen}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Render product cards */}
      {status === "loading" ? (
        <Loader />
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col h-[300px] rounded-2xl overflow-hidden border border-lightGray/15 hover:shadow-xl transition-all-400"
          >
            {/* Image Section */}
            <div className="h-[55%] w-full">
              <img
                className="h-full w-full object-cover"
                src={`${USER_API.replace("/api", "")}${item.image}`}
                alt={item.name}
              />
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col justify-between h-[42%]">
              {/* Title with Info Icon */}
              <h3 className="flex items-center gap-2 uppercase text-sm font-semibold">
                {item.name}
                <span>
                  <FaInfoCircle
                    className="text-lightGray hover:text-primary text-sm cursor-pointer"
                    onClick={() => handleInfo(item)}
                  />
                </span>
              </h3>

              {/* Description */}
              <p className="text-xs text-lightGray">{item.description}</p>

              {/* Price and Add Button */}
              <div className="flex justify-between items-center">
                <h3 className="uppercase text-lg font-medium">
                  {item.price} OXOF
                </h3>
                <button
                  className="flex items-center gap-2 text-xs text-primary font-medium rounded-full py-1 px-2 shadow-md hover:bg-primary hover:text-white"
                  onClick={() => handleAdd(item)}
                >
                  <FaBagShopping /> Add
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FeaturedCard;
