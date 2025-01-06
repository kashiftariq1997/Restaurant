import React, { useMemo, useState } from "react";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../Redux/Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaInfoCircle } from "react-icons/fa";
import { showToast } from "../../utils/ToastNotification";

const AddToCart = ({ item, setOpen }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [extraPrice, setExtraPrice] = useState(0);
  const [extras, setExtras] = useState([]);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [note, setNote] = useState();

  const [totalPrice, setTotalPrice] = useState(item.price);

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

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setTotalPrice(size?.price || item.price);
  };

  const handleExtraChange = (extra, isChecked) => {
    setExtras((prevExtras) => {
      const updatedExtras = isChecked
        ? [...prevExtras, extra]
        : prevExtras.filter((selected) => selected.name !== extra.name);

      const updatedPrice = updatedExtras.reduce(
        (acc, extra) => acc + extra.price,
        0
      );
      setExtraPrice(updatedPrice);

      return updatedExtras;
    });
  };

  const t = useMemo(() => {
    const quantity =
      cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 1;
    return quantity * ((totalPrice || 0) + (extraPrice || 0));
  }, [cartItems, item.id, totalPrice, extraPrice]);

  const updatedItem = {
    ...item,
    price: t,
    note: note,
    extras: extras,
    size: selectedSize?.size,
  };

  return (
    <div className="flex flex-col gap-6 sm:w-full md:w-[650px] h-auto p-4">
      {/* About Item */}
      <div className="flex gap-4">
        <div className="h-[72px] w-[72px] overflow-hidden rounded-lg">
          {" "}
          <img className="h-full w-ful object-cover" src={item.img} alt="Image" />
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="flex gap-2 font-semibold text-sm uppercase">
            {item.name}
            <span>
              <FaInfoCircle
                className="text-lightGray hover:text-primary text-sm cursor-pointer"
                onClick={() => handleInfo(item.name)}
              />
            </span>
          </h2>
          <p className="text-xs text-lightGray">{item.about}</p>
          <h2 className="uppercase text-sm font-semibold">{item.price}OXOF</h2>
        </div>
      </div>
      {/* Quantity  */}
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-medium">Quantity:</h1>
        <div className="flex items-center gap-2 justify-center bg-lightGray/10 rounded-full p-1">
          <button
            className="flex items-center justify-center border border-primary text-primary rounded-full h-[18px] w-[18px]"
            onClick={() => dispatch(decrementQuantity(item.id))}
          >
            -
          </button>
          <p className="font-semibold text-xs">
            {cartItems.find((cartItem) => cartItem.id === item.id)?.quantity ??
              0}
          </p>
          <button
            className="flex items-center justify-center border border-primary text-primary rounded-full h-[18px] w-[18px]"
            onClick={() => dispatch(incrementQuantity(item.id))}
          >
            +
          </button>
        </div>
      </div>
      {/* Sizes  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm font-medium">Size</h1>
        <div className="flex gap-3 w-full overflow-scroll">
          {item.sizes.map((size, index) => (
            <label
              key={index}
              className="flex items-center gap-2 bg-lightGray/10 rounded-lg p-3 cursor-pointer"
              htmlFor={`size${index}`}
            >
              <input
                type="radio"
                className="accent-primary"
                id={`size${index}`}
                name={`size${item.id}`}
                value={size.size}
                onChange={() => handleSizeChange(size)}
              />
              <div className="flex flex-col justify-between">
                <span className="uppercase text-xs text-nowrap cursor-pointer">
                  {size.size}
                </span>
                <span className="uppercase text-xs font-medium cursor-pointer">
                  +{size.price} OXOF
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Extra  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm font-medium">Extras</h1>
        <div className="flex gap-3 w-full overflow-scroll">
          {item.extras.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 bg-lightGray/10 rounded-lg p-3 cursor-pointer"
              htmlFor={`extra${index}`}
            >
              <input
                type="checkbox"
                className="accent-primary"
                id={`extra${index}`}
                onChange={(e) => handleExtraChange(item, e.target.checked)}
              />
              <div className="flex flex-col justify-between">
                <label
                  htmlFor={`extra${index}`}
                  className="uppercase text-xs text-nowrap cursor-pointer"
                >
                  {item.name}
                </label>
                <label
                  htmlFor={`extra${index}`}
                  className="uppercase text-xs font-medium cursor-pointer"
                >
                  +{item.price}OXOF
                </label>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Special Instruction  */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium">Special Instructions</p>
        <textarea
          className="text-sm border border-lightGray/20 p-2 rounded-lg h-12 text-lightGray"
          placeholder="Add note (extra mayo, chees, etc.)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <button
        className="bg-secondary text-base font-medium text-white p-3 rounded-full"
        onClick={() => {
          dispatch(addToCart(updatedItem));
          setOpen(false);
          showToast("Successfully add to cart");
        }}
      >
        Add to Cart - {t}
        OXOF
      </button>
    </div>
  );
};

export default AddToCart;
