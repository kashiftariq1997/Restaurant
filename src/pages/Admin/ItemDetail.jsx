import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { HiPuzzle, HiViewGrid, HiViewGridAdd } from "react-icons/hi";
import { PiWarningCircleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ItemDetail = () => {
  const { sidebar } = useSelector((state) => state.sidebar);

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("information");

  return (
    <section
      className={`${
        sidebar && "lg:pl-64"
      } min-h-[100vh] flex justify-center text-center md:items-start bg-lightGray/10 font-publicSans w-[100vw]`}
    >
      <div className="p-5 h-full w-full">
        {/* Breadcrumb */}
        <div className="flex items-center mb-5 w-full text-center justify-center md:justify-start">
          <NavLink to="/admin/dashboard">
            <h3 className="text-xl text-dark hover:text-primary mr-2">
              Dashboard{" "}
            </h3>
          </NavLink>
          <NavLink to="/admin/items">
            <h3 className="text-xl text-dark hover:text-primary mr-2">
              / Items{" "}
            </h3>
          </NavLink>
          <span className="text-xl text-lightGray/70"> / View</span>
        </div>

        {/* Tab Navigation */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row">
            <button
              className={`flex-1 flex items-center justify-center gap-2 ${
                activeTab === "information"
                  ? "border-t border-l border-r border-primary text-primary bg-white"
                  : "text-lightGray"
              } rounded-t-md p-3 text-sm transition-none`}
              onClick={() => setActiveTab("information")}
            >
              <PiWarningCircleFill className="text-lg" />
              Information
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 ${
                activeTab === "image"
                  ? "border-t border-l border-r border-primary text-primary bg-white"
                  : "text-lightGray"
              } rounded-t-md p-3 text-sm transition-none`}
              onClick={() => setActiveTab("image")}
            >
              <FaRegImage />
              Image
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 ${
                activeTab === "variation"
                  ? "border-t border-l border-r border-primary text-primary bg-white"
                  : "text-lightGray"
              } rounded-t-md p-3 text-sm transition-none`}
              onClick={() => setActiveTab("variation")}
            >
              <HiViewGrid className="text-lg" />
              Variation
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 ${
                activeTab === "extra"
                  ? "border-t border-l border-r border-primary text-primary bg-white"
                  : "text-lightGray"
              } rounded-t-md p-3 text-sm transition-none`}
              onClick={() => setActiveTab("extra")}
            >
              <HiViewGridAdd className="text-lg" />
              Extra
            </button>
            <button
              className={`flex-1 flex items-center justify-center gap-2 ${
                activeTab === "addon"
                  ? "border-t border-l border-r border-primary text-primary bg-white"
                  : "text-lightGray"
              } rounded-t-md p-3 text-sm transition-none`}
              onClick={() => setActiveTab("addon")}
            >
              <HiPuzzle className="text-lg" />
              Addon
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "information" && (
            <article className="bg-white w-full border border-primary rounded-b-md p-5">
              <h1 className="text-lg font-semibold text-dark">Information</h1>
              <p>Details about the item will go here.</p>
            </article>
          )}
          {activeTab === "image" && (
            <article className="bg-white w-full border border-primary rounded-b-md p-5">
              <h1 className="text-lg font-semibold text-dark">Image</h1>
              <p>Image-related content will go here.</p>
            </article>
          )}
          {activeTab === "variation" && (
            <article className="bg-white w-full border border-primary rounded-b-md p-5">
              <h1 className="text-lg font-semibold text-dark">Variation</h1>
              <p>Variation-related content will go here.</p>
            </article>
          )}
          {activeTab === "extra" && (
            <article className="bg-white w-full border border-primary rounded-b-md p-5">
              <h1 className="text-lg font-semibold text-dark">Extra</h1>
              <p>Extra-related content will go here.</p>
            </article>
          )}
          {activeTab === "addon" && (
            <article className="bg-white w-full border border-primary rounded-b-md p-5">
              <h1 className="text-lg font-semibold text-dark">Addon</h1>
              <p>Addon-related content will go here.</p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
