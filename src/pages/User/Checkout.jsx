/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
// import { AiFillEdit } from "react-icons/ai";
// import { IoIosAddCircle } from "react-icons/io";
import { RiCoupon2Fill } from "react-icons/ri";
import { GrFormNext } from "react-icons/gr";
import CommonModal from "../../common/Modal";
import { MdLocationOn } from "react-icons/md";
// import { timeSlots } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../Redux/Orders/ordersSlice";
import { showToast } from "../../utils/ToastNotification";
import { loginUser, registerUser } from "../../Redux/Users/userSlice";
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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "home",
      // day: "today",
      // time: "08:30-09:00",
    },
  });

  const selectedAddress = watch("address");
  // const selectedDay = watch("day");
  // const selectedTime = watch("time");
  const getAddress = watch("getAddress");
  const name = watch("name");
  const phone = watch("phone");

  // Function to format the current date as "HH:MM, DD-MM-YYYY"
  const formatDate = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    return `${hours}:${minutes}, ${day}-${month}-${year}`;
  };

  // Function to create the order object
  const createOrder = () => {
    return {
      phone: profile?.phone,
      status: "pending", // Default status (can be updated later)
      date: formatDate(),
      items: items,
      type: order ? "Takeaway" : "Delivery",
      address: getAddress,
      addressType: selectedAddress,
      // deliveryTime: selectedTime,
      // deliveryDay: selectedDay,
      deliveryCharge: order ? 0 : deliveryCharge,
      subtotal: totalPrice,
      price: order ? totalPrice : totalPrice + deliveryCharge,
    };
  };

  const onSubmit = async () => {
    const res = await dispatch(registerUser({ name, phone }));
    if (res.payload === "User already exists!") {
      debugger
      dispatch(loginUser({ name, phone }));
    }
    const newOrder = createOrder();
    const order = await dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigate(`/my-orders/${order.payload?.data._id}`);
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
                {/* left  */}
                <div className="bg-white rounded-xl p-4 w-full md:w-[58%] h-fit shadow-sm flex flex-col gap-4">
                  {/* map  */}
                  {/* <div className="rounded-xl h-[170px] w-full bg-blue"></div> */}
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
                  {order ? (
                    <div className="flex items-center gap-2">
                      {" "}
                      <MdLocationOn className="text-primary text-lg" />
                      <p className="text-sm">Sacrée Coeur</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <h1 className="text-base font-semibold text-dark">
                          Delivery Address
                        </h1>
                        {/* btns  */}
                        {/* <div className="flex gap-2">
                          <button
                            type="button"
                            className="flex items-center gap-1 bg-blue/20 text-blue hover:text-white hover:bg-blue text-xs font-medium px-3 rounded-full"
                          >
                            <span>
                              <AiFillEdit />
                            </span>{" "}
                            Edit Address
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1 bg-primary/10 text-primary hover:text-white hover:bg-primary text-xs font-medium px-3 rounded-full"
                          >
                            <span className="text-sm">
                              <IoIosAddCircle />
                            </span>{" "}
                            Add
                          </button>
                        </div> */}
                      </div>
                      {/* locate home or work  */}
                      {getAddress && (
                        <div className="flex flex-col md:flex-row gap-4">
                          <label
                            htmlFor="home"
                            className={`rounded-xl px-4 py-3 w-full md:w-40 border ${
                              selectedAddress === "home"
                                ? "border-primary bg-primary/10"
                                : "border-none bg-lightGray/10"
                            } `}
                          >
                            <div className="flex justify-between">
                              <p className="text-xs font-medium mb-2 text-blue">
                                Home
                              </p>
                              <input
                                type="radio"
                                value="home"
                                id="home"
                                className="accent-primary"
                                {...register("address")}
                              />
                            </div>
                            <p className="text-xs text-dark break-words">
                              {getAddress}
                            </p>
                          </label>
                          <label
                            htmlFor="work"
                            className={`rounded-xl px-4 py-3 w-full md:w-40 border ${
                              selectedAddress === "work"
                                ? "border-primary bg-primary/10"
                                : "border-none bg-lightGray/10"
                            } `}
                          >
                            <div className="flex justify-between">
                              <p className="text-xs font-medium mb-2 text-blue">
                                Work
                              </p>
                              <input
                                type="radio"
                                value="work"
                                id="work"
                                className="accent-primary"
                                {...register("address")}
                              />
                            </div>
                            <p className="text-xs text-dark break-words">
                              {getAddress}
                            </p>
                          </label>
                        </div>
                      )}
                    </>
                  )}

                  {/* <h1 className="text-base font-semibold text-dark">
                    Preferred Time Frame For Delivery
                  </h1> */}
                  {/* day  */}
                  {/* <div className="flex gap-4">
                    <label
                      htmlFor="today"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 w-fit border ${
                        selectedDay === "today"
                          ? "border-primary bg-primary/10"
                          : "border-none bg-lightGray/10"
                      } `}
                    >
                      <input
                        type="radio"
                        value="today"
                        id="today"
                        className="accent-primary"
                        {...register("day")}
                      />
                      <p className="text-sm">Today</p>
                    </label>
                    <label
                      htmlFor="tomorrow"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 w-fit border ${
                        selectedDay === "tomorrow"
                          ? "border-primary bg-primary/10"
                          : "border-none bg-lightGray/10"
                      } `}
                    >
                      <input
                        type="radio"
                        value="tomorrow"
                        id="tomorrow"
                        className="accent-primary"
                        {...register("day")}
                      />
                      <p className="text-sm">Tomorrow</p>
                    </label>
                  </div> */}
                  {/* time  */}
                  {/* <div className="flex gap-4 overflow-scroll">
                    {timeSlots.map((time) => (
                      <label
                        key={time}
                        htmlFor={time}
                        className={`flex items-center gap-2 rounded-xl  flex-shrink-0 px-3 py-2 w-fit border ${
                          selectedTime === time
                            ? "border-primary bg-primary/10"
                            : "border-none bg-lightGray/10"
                        } `}
                      >
                        <input
                          type="radio"
                          value={time}
                          id={time}
                          className="accent-primary"
                          {...register("time")}
                        />
                        <p className="text-sm">{time}</p>
                      </label>
                    ))}
                  </div> */}
                </div>
                {/* right  */}
                <div className="bg-white flex-1 rounded-xl h-fit p-4 shadow-sm text-dark items-center flex flex-col gap-4">
                  <h1 className="text-base font-medium w-full text-center">
                    Cart Summary
                  </h1>
                  {/* order btns  */}
                  <div className="flex text-xs text-blue bg-blue/20 rounded-full w-fit">
                    <h3
                      onClick={() => setOrder(false)}
                      className={`${
                        !order && "bg-blue text-white"
                      } py-2 px-4 rounded-full cursor-pointer font-medium`}
                    >
                      Delivery
                    </h3>
                    <h3
                      onClick={() => setOrder(true)}
                      className={`${
                        order && "bg-blue text-white"
                      } py-2 px-4 rounded-full cursor-pointer font-medium`}
                    >
                      Takeaway
                    </h3>
                  </div>
                  {/* items */}
                  <div className="border-b border-lightGray/20 w-full pb-4">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-col w-full text-start gap-2 pt-2 "
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
                            <p className="text-xs font-semibold">
                              {item.price * item.quantity}OXOF
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* coupen  */}
                  <div
                    className="flex shadow-md transition-none text-dark/90 gap-4 items-center hover:text-primary cursor-pointer w-full rounded-lg px-4 py-3"
                    onClick={() => handleCoupon()}
                  >
                    <RiCoupon2Fill className="text-blue text-2xl" />
                    <div className="mr-auto">
                      <p className="text-xs font-semibold">
                        Select Offer/Apply Coupon
                      </p>
                      <p className="text-[10px]">
                        Get discount with the your order
                      </p>
                    </div>
                    <GrFormNext className="text-3xl text-blue" />
                  </div>
                  {/* detail  */}
                  <div className="border border-lightGray/10 rounded-xl w-full p-3">
                    <div className="flex justify-between pb-3">
                      <p className="text-sm">Subtotal</p>{" "}
                      <p className="text-sm">{totalPrice}OXOF</p>{" "}
                    </div>
                    <div className="flex justify-between pb-3">
                      <p className="text-sm">Discount</p>{" "}
                      <p className="text-sm">OXOF</p>{" "}
                    </div>
                    {!order && (
                      <div className="flex justify-between pb-3">
                        <p className="text-sm">Delivery Charges</p>{" "}
                        <p className="text-sm text-green">
                          {deliveryCharge}OXOF
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-lightGray/10">
                      <p className="text-sm font-semibold">Total</p>{" "}
                      <p className="text-sm font-semibold">
                        {order ? totalPrice : totalPrice + deliveryCharge}OXOF
                      </p>{" "}
                    </div>
                  </div>

                  <button
                    className="text-white bg-secondary rounded-full w-full text-base font-semibold p-4 "
                    // onClick={() => navigate("/my-orders")}
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
