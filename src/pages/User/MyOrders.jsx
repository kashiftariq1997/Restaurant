import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiCallBellFill } from "react-icons/pi";
import { GrFormNext } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { fetchOrdersByPhone } from "../../Redux/Orders/ordersSlice";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";

const MyOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phone } = location.state || {};
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!phone) {
      toast.error("Numéro de téléphone manquant. Redirection vers la page de suivi.");
      navigate("/order-tracking");
      return;
    }

    const fetchOrders = async () => {
      try {
        const resultAction = await dispatch(fetchOrdersByPhone(phone));
        if (fetchOrdersByPhone.fulfilled.match(resultAction)) {
          setOrders(resultAction.payload.data);
        } else {
          toast.error(resultAction.payload || "Erreur lors de la récupération des commandes");
        }
      } catch (error) {
        toast.error("Une erreur est survenue lors de la récupération des commandes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch, navigate, phone]);

  const handleOrderStatusClick = (order) => {
    navigate("/order-status", { state: { order } });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="flex flex-col items-center text-dark z-10 min-h-[calc(100vh-340px)] w-full bg-lightGray/5">
          <div className="w-full h-full md:p-4 md:container flex justify-center">
            <div className="w-full lg:w-[65%] my-6 mb-10">
              <NavLink
                to="/home"
                className="cursor-pointer text-primary text-nowrap text-xs font-medium flex items-center gap-2 mb-4"
              >
                <span className="text-lg">
                  <TbArrowBackUp />
                </span>
                Back to Home
              </NavLink>

              <div className="flex justify-between gap-4">
                {/* Active Orders */}
                <div className="flex flex-col flex-1">
                  <h1 className="text-2xl font-semibold text-blue mb-4">
                    Active Orders
                  </h1>
                  <div className="bg-white rounded-xl p-4 w-full h-fit shadow-sm flex flex-col gap-4">
                    {orders
                      ?.filter((order) => order.status !== "Delivered")
                      .map((order) => (
                        <div
                          key={order._id}
                          className="flex gap-4 items-center border border-lightGray/10 rounded-xl py-2 px-4"
                        >
                          <PiCallBellFill className="text-blue text-4xl" />
                          <div className="text-lightGray flex flex-col gap-[5px] w-full">
                            <div className="flex gap-3 items-center">
                              <p className="text-sm">
                                Order ID:{" "}
                                <span className="text-dark">#{order._id}</span>
                              </p>
                              <p
                                className={`text-[10px] rounded-full ${
                                  order.status === "pending"
                                    ? "bg-yellow/20 text-yellow"
                                    : "bg-green/20 text-green"
                                } px-2 py-[2px]`}
                              >
                                {order.status}
                              </p>
                            </div>
                            <p className="text-xs">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-blue">{order.type}</p>
                            <div className="flex justify-between items-center w-full">
                              <p className="text-sm text-dark mt-2">
                                Total:{" "}
                                <span className="font-semibold">
                                  {order.price}OXOF
                                </span>
                              </p>
                              <button
                                onClick={() => handleOrderStatusClick(order)}
                                className="flex items-center text-xs text-primary"
                              >
                                See Details <GrFormNext />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Previous Orders */}
                <div className="flex flex-col flex-1">
                  <h1 className="text-2xl font-semibold text-blue mb-4">
                    Previous Orders
                  </h1>
                  <div className="bg-white rounded-xl p-4 w-full h-fit shadow-sm flex flex-col gap-4">
                    {orders
                      ?.filter((order) => order.status === "Delivered")
                      .map((order) => (
                        <div
                          key={order._id}
                          className="flex gap-4 items-center border border-lightGray/10 rounded-xl py-2 px-4"
                        >
                          <PiCallBellFill className="text-blue text-4xl" />
                          <div className="text-lightGray flex flex-col gap-[5px] w-full">
                            <div className="flex gap-3 items-center">
                              <p className="text-sm">
                                Order ID:{" "}
                                <span className="text-dark">#{order._id}</span>
                              </p>
                              <p className="text-[10px] rounded-full bg-primary/10 text-primary px-2 py-[2px]">
                                {order.status}
                              </p>
                            </div>
                            <p className="text-xs">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-blue">{order.type}</p>
                            <div className="flex justify-between items-center w-full">
                              <p className="text-sm text-dark mt-2">
                                Total:{" "}
                                <span className="font-semibold">
                                  {order.price}OXOF
                                </span>
                              </p>
                              <button
                                onClick={() => handleOrderStatusClick(order)}
                                className="flex items-center text-xs text-primary"
                              >
                                See Details <GrFormNext />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MyOrders;
