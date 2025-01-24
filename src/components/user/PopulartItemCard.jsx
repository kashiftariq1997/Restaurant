import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import AddModal from "../../common/AddModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/cartSlice";
import Loader from "../../common/Loader";

const USER_API = import.meta.env.VITE_API_URL;

const PopulartItemCard = ({ items, status }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); // Dispatch the item to the cart
  };

  const handleAdd = (item) => {
    setSelectedProduct(item);
    setOpen(true);
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
            className="flex h-[145px] rounded-xl overflow-hidden border border-lightGray/15 hover:shadow-xl transition-all-400"
          >
            <div className="h-[100%] w-[30%]">
              <img
                className="h-full w-full object-cover"
                src={`${USER_API.replace("/api", "")}${item.image}`}
                alt={item.name}
              />
            </div>
            <div className="p-3 flex flex-col justify-between h-full w-[70%]">
              <h3 className="flex items-center gap-2 uppercase text-sm font-semibold">
                {item.name}
                <span>
                  <FaInfoCircle className="text-lightGray hover:text-primary text-sm cursor-pointer" />
                </span>
              </h3>
              <p className="text-xs text-gray-500">{item.description}</p>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{item.price} OXOF</h3>
                <button
                  className="text-primary bg-gray-200 rounded-full px-3 py-1 text-sm"
                  onClick={() => handleAdd(item)} // Open modal
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

export default PopulartItemCard;
