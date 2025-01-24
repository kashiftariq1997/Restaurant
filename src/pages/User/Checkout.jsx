/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { RiCoupon2Fill } from "react-icons/ri";
import { GrFormNext } from "react-icons/gr";
import CommonModal from "../../common/Modal";
import { MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../Redux/Orders/ordersSlice";
import { showToast } from "../../utils/ToastNotification";
import { clearCart } from "../../Redux/Cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deliveryCharge = 150;
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [order, setOrder] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "home",
    },
  });

  const selectedAddress = watch("address");
  const getAddress = watch("getAddress");
  const name = watch("name");
  const phone = watch("phone");

  useEffect(() => {
    if (profile?.name) {
      setValue("name", profile.name);
    }
    if (profile?.phone) {
      setValue("phone", profile.phone);
    }
  }, [profile, setValue]);

  const formatDate = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    return `${hours}:${minutes}, ${day}-${month}-${year}`;
  };

  const createOrder = () => {
    return {
      phone: profile?.phone || phone,
      status: "pending",
      date: formatDate(),
      items: items,
      type: order ? "Takeaway" : "Delivery",
      address: getAddress,
      addressType: selectedAddress,
      deliveryCharge: order ? 0 : deliveryCharge,
      subtotal: totalPrice,
      price: order ? totalPrice : totalPrice + deliveryCharge,
    };
  };

  const onSubmit = async () => {
    const newOrder = createOrder();
    const order = await dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigate('/order-status', { state: { order: order.payload?.data } });
    showToast("Order placed successfully");
  };

  const handleCoupon = () => {
    setModalContent(
      <div className="flex flex-col sm:w-full md:w-[350px] h-fit p-4">
        <h1 className="text-base font-semibold">Coupon Code</h1>
        <div className="flex overflow-hidden my-4 border border-lightGray/20 rounded-lg">
          <input
            type="text"
            autoFocus
            className="w-full text-sm text-lightGray px-4"
          />
          <button className="bg-green text-sm font-semibold px-4 py-3 text-white">
            Apply
          </button>
        </div>
        <h1 className="text-base font-semibold">Offer for you</h1>
        <p className="text-xs">Coupon built just for you</p>
      </div>
    );
    setOpen(true);
  };

  return (
    <>
      <CommonModal open={open} setOpen={setOpen}>
        {modalContent}
      </CommonModal>
      <section className="flex flex-col items-center text-dark z-10 min-h-[calc(100vh-340px)] w-full bg-lightGray/5">
        <div className="w-full h-full md:p-4 md:container flex justify-center">
          <div className="w-full lg:w-[85%] my-6 mb-10">
            <NavLink
              to="/home"
              className="cursor-pointer text-primary text-nowrap text-xs font-medium flex items-center gap-2 mb-4"
            >
              <span className="text-lg">
                <TbArrowBackUp />
              </span>
              Back to Home
            </NavLink>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Left Section */}
                <div className="bg-white rounded-xl p-4 w-full md:w-[58%] h-fit shadow-sm flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-lightGray">
                      Name
                    </label>
                    <input
                      name="name"
                      id="name"
                      className="text-lightGray border border-lightGray/20 rounded-md p-2 text-sm"
                      required
                      {...register("name")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm text-lightGray">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="text-lightGray border border-lightGray/20 rounded-md p-2 text-sm"
                      required
                      {...register("phone")}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="address" className="text-sm text-lightGray">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="getAddress"
                      className="text-lightGray border border-lightGray/20 rounded-md p-2 text-sm"
                      required
                      {...register("getAddress")}
                    />
                  </div>
                </div>

                {/* Right Section */}
                <div className="bg-white flex-1 rounded-xl h-fit p-4 shadow-sm text-dark items-center flex flex-col gap-4">
                  <h1 className="text-base font-medium w-full text-center">
                    Cart Summary
                  </h1>
                  <div className="border-b border-lightGray/20 w-full pb-4">
                    {items.map((item, index) => {
                      const sizePrice = item.selectedSize?.price || 0;
                      const extrasPrice = (item.selectedExtras || []).reduce(
                        (sum, extra) => sum + extra.price,
                        0
                      );
                      const itemTotalPrice =
                        (sizePrice + extrasPrice) * item.quantity;

                      return (
                        <div
                          key={`${item._id}-${index}`}
                          className="flex flex-col w-full text-start gap-2 pt-2"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="relative h-16 w-16 rounded-lg">
                              <div className="h-6 w-6 bg-dark rounded-full absolute text-white flex items-center justify-center top-[30%] left-[-10px]">
                                {item.quantity}
                              </div>
                              <img
                                className="h-full w-full object-cover rounded-lg"
                                src={item.image}
                                alt="Image"
                              />
                            </div>
                            <div className="text-start mr-auto">
                              <h2 className="uppercase text-sm font-medium hover:underline cursor-pointer text-nowrap">
                                {item.name}
                              </h2>
                              <p className="text-xs">
                                <strong>Size:</strong> {item.selectedSize?.size || "Default"}
                              </p>
                              <p className="text-xs">
                                <strong>Extras:</strong>{" "}
                                {item.selectedExtras?.length > 0
                                  ? item.selectedExtras
                                      .map((extra) => extra.name)
                                      .join(", ")
                                  : "None"}
                              </p>
                              <p className="text-xs font-semibold">
                                Total: {itemTotalPrice.toFixed(2)} OXOF
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Total Price */}
                  <div className="w-full border-t pt-4">
                    <div className="flex justify-between pb-3">
                      <p className="text-sm">Subtotal</p>
                      <p className="text-sm">{totalPrice.toFixed(2)} OXOF</p>
                    </div>
                    {!order && (
                      <div className="flex justify-between pb-3">
                        <p className="text-sm">Delivery Charge</p>
                        <p className="text-sm">{deliveryCharge} OXOF</p>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t">
                      <p className="text-sm font-semibold">Total</p>
                      <p className="text-sm font-semibold">
                        {(order ? totalPrice : totalPrice + deliveryCharge).toFixed(2)}{" "}
                        OXOF
                      </p>
                    </div>
                  </div>
                  {/* Place Order Button */}
                  <button
                    type="submit"
                    className="text-white bg-secondary rounded-full w-full text-base font-semibold p-4"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
