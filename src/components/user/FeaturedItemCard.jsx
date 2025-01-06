import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import CommonModal from "../../common/Modal";
import { t } from "i18next";
// import AddToCart from "./AddToCart";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Cart/cartSlice";
import { showToast } from "../../utils/ToastNotification";

const FeaturedCard = ({ items, status }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleInfo = (name) => {
    setModalContent(
      <div className="w-[550px] h-24">
        <h1 className="text-base uppercase text-dark font-medium border-b border-lightGray/15 p-4 mb-8 ">
          {name}
        </h1>
      </div>
    );
    setOpen(true);
  };

  const handleAdd = (item) => {
    // setModalContent(<AddToCart item={item} setOpen={setOpen} />);
    // setOpen(true);
    dispatch(addToCart(item));
    showToast("Successfully add to cart");
  };

  return (
    <>
      {open && (
        <CommonModal open={open} setOpen={setOpen}>
          {modalContent}
        </CommonModal>
      )}
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {items?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-[300px] rounded-2xl overflow-hidden border border-lightGray/15 hover:shadow-xl transition-all-400"
            >
              <div className="h-[55%] w-full">
                <img
                  className="h-full w-full object-cover"
                  src={item.image}
                  alt="Image"
                />
              </div>
              <div className="p-3 flex flex-col justify-between h-[42%]">
                <h3 className="flex items-center gap-2 uppercase text-sm font-semibold">
                  {item.name}
                  <span>
                    <FaInfoCircle
                      className="text-lightGray hover:text-primary text-sm cursor-pointer"
                      onClick={() => handleInfo(item.name)}
                    />
                  </span>
                </h3>
                <p className="text-xs text-lightGray">{item.description}</p>
                <div className="flex justify-between">
                  <h3 className="uppercase text-lg font-medium">
                    {item.price}OXOF
                  </h3>
                  <button
                    className="flex items-center gap-2 text-xs text-primary font-medium rounded-full py-1 px-2 shadow-md hover:bg-primary hover:text-white"
                    onClick={() => handleAdd(item)}
                  >
                    <FaBagShopping /> {t("add")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default FeaturedCard;
