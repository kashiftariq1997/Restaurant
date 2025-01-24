import React, { useEffect, useState } from "react";
import MenuItems from "../../components/user/MenuItems";
import { menu } from "../../data";
import { TbLayoutGridFilled, TbLayoutListFilled } from "react-icons/tb";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/Products/productSlice";
import Loader from "../../common/Loader";
import PopulartItemCard from "../../components/user/PopulartItemCard";
import FeaturedCard from "../../components/user/FeaturedItemCard";

const Menu = () => {
  const [layout, setLayout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
  const { products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [prod, setProd] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products?.data) {
      setProd(products.data);
    }
  }, [products]);

  return (
    <>
      {status === "pending" ? (
        <Loader />
      ) : (
        <section className="flex flex-col text-dark z-10 h-auto w-full">
          <div className="flex w-full md:container py-8">
            {/* Left Content Area */}
            <div className="flex-1 pr-6">
              {menu?.map((item) => (
                <div key={item.id} className="w-full mb-12">
                  {/* Header with category title and layout toggle */}
                  <div
                    className="flex justify-between items-center mb-4"
                    id={item.name}
                  >
                    <h1 className="uppercase text-primary text-2xl font-semibold">
                      {item.name}
                    </h1>
                    <div className="flex gap-2 items-center">
                      <TbLayoutListFilled
                        className={`cursor-pointer text-2xl ${
                          layout && "text-lightGray/50"
                        }`}
                        onClick={() => setLayout(false)}
                      />
                      <TbLayoutGridFilled
                        className={`cursor-pointer text-2xl ${
                          !layout && "text-lightGray/50"
                        }`}
                        onClick={() => setLayout(true)}
                      />
                    </div>
                  </div>

                  {/* Products grid with additional padding/margin */}
                  {layout ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 md:px-4">
                      <FeaturedCard
                        items={prod?.filter(
                          (data) => data.category === item?.name
                        )}
                        status={status}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-4">
                      <PopulartItemCard
                        items={prod?.filter(
                          (data) => data.category === item?.name
                        )}
                        status={status}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Menu Items */}
            <div className="hidden md:block w-56 pl-16 flex-shrink-0">
              <div className="sticky top-20">
                <MenuItems items={menu} />
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="fixed top-5 right-5 md:hidden z-30">
            <button
              className="bg-primary text-white p-3 rounded-full shadow-lg"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <IoClose size={24} /> : <HiMenuAlt2 size={24} />}
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          {menuOpen && (
            <div className="fixed inset-0 z-20 bg-black/50">
              <div
                className="absolute top-20 right-5 bg-transparent"
                style={{
                  maxHeight: "calc(100% - 40px)",
                  maxWidth: "300px",
                  overflowY: "auto",
                }}
              >
                <div className="bg-white shadow-md rounded-lg p-2">
                  <MenuItems
                    items={menu}
                    onItemClick={() => setMenuOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Menu;
