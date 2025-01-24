import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import gif from "../../assets/empty-cart.gif";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../Redux/Cart/cartSlice";
import { motion as m } from "framer-motion";
import { fadeIn } from "../../utils/variants";

const Cart = ({ setCart }) => {
  const [order, setOrder] = useState(false);
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className="fixed h-[100vh] w-[100vw] z-50 bg-black/60">
  <m.div
    variants={fadeIn("left", 400)}
    initial="hidden"
    animate="show"
    className="flex relative flex-col float-end justify-between bg-white h-full w-full md:w-[380px] lg:w-[450px]"
  >
    <div className="flex relative top-4 lg:top-20 w-full overflow-auto h-[75%] px-2 sm:px-4">
      <button
        className="absolute right-4 top-2 text-lg md:text-xl p-[2px] text-white bg-orange rounded-full"
        onClick={() => setCart(false)}
      >
        <IoClose />
      </button>
      {items?.length > 0 ? (
        <div className="flex flex-col text-center gap-4 items-center text-dark w-full p-2 sm:p-4">
          <h2 className="text-lg md:text-xl font-semibold">My Cart</h2>
          <div className="flex text-xs md:text-sm text-blue bg-blue/20 rounded-full">
            <h3
              onClick={() => setOrder(false)}
              className={`py-1 px-3 sm:py-2 sm:px-4 rounded-full cursor-pointer font-medium ${
                !order && "bg-blue text-white"
              }`}
            >
              Delivery
            </h3>
            <h3
              onClick={() => setOrder(true)}
              className={`py-1 px-3 sm:py-2 sm:px-4 rounded-full cursor-pointer font-medium ${
                order && "bg-blue text-white"
              }`}
            >
              Takeaway
            </h3>
          </div>
          {/* Cart Items */}
          {items.map((item) => (
            <div
              key={item.uniqueId}
              className="flex flex-col w-full text-start gap-2 pt-2"
            >
              <div className="flex flex-wrap items-center gap-3 w-full">
                <div className="h-16 w-16 overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full object-cover"
                    src={item.image}
                    alt="Image"
                  />
                </div>
                <div className="text-start mr-auto flex-1">
                  <h2 className="uppercase text-sm md:text-base font-medium hover:underline cursor-pointer truncate">
                    {item.name.slice(0, 15)}...
                  </h2>
                  <p className="text-xs md:text-sm font-semibold">
                    {item.quantity *
                      ((item.selectedSize?.price || item.price) +
                        (item.selectedExtras?.reduce(
                          (sum, extra) => sum + extra.price,
                          0
                        ) || 0))}{" "}
                    OXOF
                  </p>
                  {item.selectedSize && (
                    <p className="text-xs md:text-sm text-gray-600">
                      Size: {item.selectedSize.size}
                    </p>
                  )}
                  {item.selectedExtras?.length > 0 && (
                    <p className="text-xs md:text-sm text-gray-600">
                      Extras:{" "}
                      {item.selectedExtras
                        .map((extra) => extra.name)
                        .join(", ")}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 justify-center self-end rounded-full p-1">
                  <button
                    className="flex items-center justify-center border border-primary text-primary rounded-full h-[18px] w-[18px]"
                    onClick={() => dispatch(decrementQuantity(item.uniqueId))}
                  >
                    -
                  </button>
                  <p className="font-semibold text-xs md:text-sm">
                    {item.quantity}
                  </p>
                  <button
                    className="flex items-center justify-center border border-primary text-primary rounded-full h-[18px] w-[18px]"
                    onClick={() => dispatch(incrementQuantity(item.uniqueId))}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 text-xs md:text-sm underline ml-4"
                  onClick={() => dispatch(removeFromCart(item.uniqueId))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-10 items-center text-center p-6 justify-center h-full w-full">
          <h2 className="text-lg md:text-xl font-semibold">My Cart</h2>
          <div className="h-[120px] w-[120px] md:h-[160px] md:w-[160px] overflow-hidden">
            <img
              src={gif}
              alt="gif"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xs md:text-sm text-lightGray">
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </p>
        </div>
      )}
    </div>

    {items.length > 0 && (
      <div className="flex gap-4 flex-col w-full p-4 mb-3 bg-white z-50">
        <div className="flex justify-between border border-lightGray/20 p-2 md:p-3 rounded-xl">
          <h2 className="text-sm md:text-base font-semibold text-dark">
            Subtotal
          </h2>
          <h2 className="text-sm md:text-base font-semibold text-green">
            {totalPrice} OXOF
          </h2>
        </div>
        <button
          className="p-2 md:p-3 text-sm md:text-base w-full rounded-full bg-secondary text-white"
          onClick={() => {
            navigate("/checkout");
            setCart(false);
          }}
        >
          Proceed To Checkout
        </button>
      </div>
    )}
  </m.div>
</section>
  );
};

export default Cart;
