import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import delivered from "../../assets/delivered.gif";
import placed from "../../assets/placed.gif";
import { IoCheckmarkSharp } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import { IoIosChatbubbles } from "react-icons/io";
import { PiPhonePauseFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { steps } from "../../data";
import Loader from "../../common/Loader";
import { showToast } from "../../utils/ToastNotification";

const OrderInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orders, status } = useSelector((state) => state.orders);
  const [currentStep, setCurrentStep] = useState(1);
  const [circleColor, setCircleColor] = useState(0);
  const order = Array.isArray(orders)
    ? orders?.find((order) => order?._id === id)
    : null;

  useEffect(() => {
    if (order && order?.status === "delivered") setCurrentStep(5);
  }, [order]);

  const handleStateChange = (level) => {
    setCircleColor(level); // Update the number of colored circles
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <section className="flex flex-col items-center text-dark z-10 min-h-[calc(100vh-340px)] w-full bg-lightGray/5">
            <div className="w-full h-full md:p-4 md:container flex justify-center">
              <div className="w-full lg:w-[65%] my-6 mb-10">
                <NavLink
                  to="/my-orders"
                  className="cursor-pointer text-primary text-nowrap text-xs font-medium flex items-center gap-2 mb-4"
                >
                  <span className="text-lg">
                    <TbArrowBackUp />
                  </span>
                  Back to Orders
                </NavLink>
                <div className="flex gap-4">
                  {/* left  */}
                  <div className="flex flex-col gap-6 w-full h-fit">
                    <div className="bg-white rounded-xl p-4 w-full h-fit shadow-sm flex flex-col gap-2">
                      <p className="text-sm font-medium">
                        Order ID: <span className="text-blue">#{id}</span>{" "}
                      </p>
                      <p className="text-xs text-lightGray">{order?.date}</p>
                      <p className="text-sm text-lightGray">
                        Order Type:{" "}
                        <span className="text-dark ml-1">{order?.type}</span>{" "}
                      </p>
                      {order?.status === "delivered" ? (
                        <>
                          <h1 className="text-xl font-medium text-center mt-3">
                            Your order has been delivered
                          </h1>
                          <div className="h-32 w-32 overflow-hidden self-center">
                            <img src={delivered} alt="Image" />
                          </div>
                          <p className="text-xs text-center">
                            Enjoy your food!
                          </p>
                        </>
                      ) : (
                        <>
                          <h1 className="text-lg font-semibold text-center">
                            30 min
                          </h1>
                          <div className="h-32 w-32 overflow-hidden self-center">
                            <img src={placed} alt="Image" />
                          </div>
                          <p className="text-xs text-center">
                            Got your order Mohamed Masseye DIOP!
                          </p>
                        </>
                      )}
                      <div className="border-2 relative border-primary mt-4">
                        <div className="flex items-start absolute top-[-11px] left-0 justify-between w-full">
                          {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                              <div className="flex flex-col items-center">
                                <div
                                  className={`h-6 w-6 flex items-center justify-center rounded-full ${
                                    currentStep >= step.id
                                      ? "bg-primary border-primary text-white"
                                      : "bg-white border-secondary text-white"
                                  } border-2`}
                                >
                                  <IoCheckmarkSharp />
                                </div>
                                <span className="mt-2 text-[10px] text-center">
                                  {step.label}
                                </span>
                              </div>

                              {index < steps.length - 1 && (
                                <div
                                  className={`flex-1 h-[2px] ${
                                    currentStep > step.id
                                      ? "bg-primary"
                                      : "bg-secondary"
                                  } mx-2`}
                                ></div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-base font-semibold mt-16">Dakar</h3>
                      <div className="flex items-center gap-2">
                        <TiLocation className="text-lg text-lightGray mr-2" />{" "}
                        <p className="text-sm mr-auto">Sacrée Coeur</p>
                        <div className="cursor-pointer flex items-center justify-center text-primary icon bg-primary/10 h-8 w-8 rounded-full">
                          <IoIosChatbubbles />
                        </div>
                        <div className="cursor-pointer flex items-center justify-center text-primary icon bg-primary/10 h-8 w-8 rounded-full">
                          <PiPhonePauseFill />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 w-full h-fit shadow-sm flex flex-col gap-2">
                      <h3 className="text-sm font-semibold">
                        Delivery Address
                      </h3>
                      <p className="flex items-center gap-2 text-sm mr-auto">
                        <TiLocation className="text-lg text-lightGray mr-2" />{" "}
                        {order?.address}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 w-full h-fit shadow-sm flex flex-col gap-2">
                      <h3 className="text-sm font-semibold">Payment Info</h3>
                      <div style={{ textAlign: "center" }}>
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="100"
          cy="100"
          r="20"
          fill="none" // Keep the inside empty
          stroke={circleColor >= 1 ? "blue" : "black"} // Update stroke color
          strokeWidth="8"
        />
        <circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke={circleColor >= 2 ? "blue" : "black"}
          strokeWidth="8"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke={circleColor >= 3 ? "blue" : "black"}
          strokeWidth="8"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={circleColor >= 4 ? "blue" : "black"}
          strokeWidth="8"
        />
      </svg>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleStateChange(0)}>Reset</button>
        <button onClick={() => handleStateChange(1)}>Color 1 Border</button>
        <button onClick={() => handleStateChange(2)}>Color 2 Borders</button>
        <button onClick={() => handleStateChange(3)}>Color 3 Borders</button>
        <button onClick={() => handleStateChange(4)}>Color 4 Borders</button>
      </div>
    </div>
                      <p className="flex items-center gap-2 text-lightGray text-sm mr-auto">
                        Method:{" "}
                        <span className="text-dark">Cash On Delivery</span>
                      </p>
                      <p className="flex items-center gap-2 text-lightGray text-sm mr-auto">
                        Status: <span className="text-orange">Unpaid</span>
                      </p>
                    </div>
                  </div>

                  {/* right  */}
                  <div className="bg-white rounded-xl p-4 w-full h-fit shadow-sm flex flex-col gap-4">
                    <div className="border-b border-lightGray/20 w-full pb-4">
                      {order?.items.map((item) => (
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
                    <div className="border border-lightGray/10 rounded-xl w-full p-3">
                      <div className="flex justify-between pb-3">
                        <p className="text-sm">Subtotal</p>{" "}
                        <p className="text-sm">{order?.subtotal}OXOF</p>{" "}
                      </div>
                      <div className="flex justify-between pb-3">
                        <p className="text-sm">Discount</p>{" "}
                        <p className="text-sm">OXOF</p>{" "}
                      </div>
                      <div className="flex justify-between pb-3">
                        <p className="text-sm">Delivery Charges</p>{" "}
                        <p className="text-sm text-green">
                          {order?.deliveryCharge === 0
                            ? ""
                            : order?.deliveryCharge}
                          OXOF
                        </p>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-lightGray/10">
                        <p className="text-sm font-semibold">Total</p>{" "}
                        <p className="text-sm font-semibold">
                          {order?.price}OXOF
                        </p>{" "}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        showToast("Order Canceled", "info");
                        navigate("/my-orders");
                      }}
                      className={`${
                        order?.status === "pending" ? "bg-orange" : "bg-green"
                      } text-white text-base font-semibold rounded-full py-3`}
                    >
                      {order?.status ? "Cancel Order" : "Print Invoice"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default OrderInfo;
