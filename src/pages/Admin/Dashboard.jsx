import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiBox3Fill } from "react-icons/ri";
import {
  FaUserGroup,
  FaClipboardList,
  FaBellConcierge,
  FaTruckArrowRight,
} from "react-icons/fa6";
import { MdCancelScheduleSend, MdOutlinePendingActions } from "react-icons/md";
import { BsClipboardCheckFill } from "react-icons/bs";

const Dashboard = () => {
  const { sidebar } = useSelector((state) => state.sidebar);
  const today = new Date().toISOString().split("T")[0];

  return (
    <section
      className={`${
        sidebar && "lg:pl-64"
      } h-[100vh] flex items-center justify-center bg-lightGray/10 font-publicSans`}
    >
      <article className="px-6 py-4 h-full w-full">
        <h1 className="text-2xl font-semibold text-primary">Good Evening!</h1>
        <h1 className="text-xl font-medium mt-2">Muhammad Admin</h1>
        {/* overview  */}
        <h2 className="text-xl font-semibold mt-8">Overview</h2>
        <div className="flex justify-between gap-6 w-full mt-4 flex-wrap">
          <div className="bg-secondary text-white p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-white grid place-content-center">
              <AiFillDollarCircle className="text-secondary text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Total Sales</p>
              <p className="text-lg font-semibold">134986XOF</p>
            </div>
          </div>
          <div className="bg-lightPurple text-white p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-white grid place-content-center">
              <RiBox3Fill className="text-lightPurple text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Total Orders</p>
              <p className="text-lg font-semibold">10</p>
            </div>
          </div>{" "}
          <div className="bg-blueVariant text-white p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-white grid place-content-center">
              <FaUserGroup className="text-blueVariant text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Total Customers</p>
              <p className="text-lg font-semibold">34</p>
            </div>
          </div>{" "}
          <div className="bg-purple text-white p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-white grid place-content-center">
              <FaClipboardList className="text-purple/80 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Total Menu Items</p>
              <p className="text-lg font-semibold">26</p>
            </div>
          </div>
        </div>
        {/* order statistics  */}
        <div className="flex justify-between  mt-8 items-center">
          <h2 className="text-lg font-semibold">Order Statistics</h2>
          <input
            type="date"
            name=""
            id=""
            className="h-10 p-2 text-sm text-lightGray border border-lightGray/30 rounded-md"
            defaultValue={today}
          />
        </div>
        <div className="flex justify-between gap-6 w-full mt-4 flex-wrap">
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-primary/10 grid place-content-center">
              <RiBox3Fill className="text-primary text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Total Orders</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-yellow/10 grid place-content-center">
              <MdOutlinePendingActions className="text-yellow text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Pending</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>{" "}
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-green/10 grid place-content-center">
              <FaBellConcierge className="text-green text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Processing</p>
              <p className="text-lg font-semibold">2</p>
            </div>
          </div>{" "}
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-blue/10 grid place-content-center">
              <FaTruckArrowRight className="text-blue text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Out For Delivery</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-6 w-full mt-4 flex-wrap">
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-lightPurple/10 grid place-content-center">
              <BsClipboardCheckFill className="text-lightPurple text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Delivered</p>
              <p className="text-lg font-semibold">12</p>
            </div>
          </div>
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-orange/10 grid place-content-center">
              <MdCancelScheduleSend className="text-orange text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Canceled</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>{" "}
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-blueVariant/10 grid place-content-center">
              <FaBellConcierge className="text-blueVariant text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Returened</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>{" "}
          <div className="bg-white text-dark p-4 flex-shrink-0 h-[90px] flex gap-4 items-center flex-1 rounded-lg min-w-80">
            <div className="h-12 w-12 rounded-full bg-orange/10 grid place-content-center">
              <MdCancelScheduleSend className="text-orange text-2xl" />
            </div>
            <div>
              <p className="text-sm text-lightGray">Rejected</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
