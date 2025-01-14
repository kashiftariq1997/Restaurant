import React, { useEffect, useState } from "react";
import MenuItems from "../../components/user/MenuItems";
import { menu } from "../../data";
import { TbLayoutGridFilled, TbLayoutListFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/Products/productSlice";
import Loader from "../../common/Loader";
import PopulartItemCard from "../../components/user/PopulartItemCard";
import FeaturedCard from "../../components/user/FeaturedItemCard";

const Menu = () => {
  const [layout, setLayout] = useState(false);
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
        <section className="flex flex-col items-center text-dark z-10 h-auto w-full">
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

                  {/* Products grid */}
                  {layout ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      <FeaturedCard
                        items={prod?.filter(
                          (data) => data.category === item?.name
                        )}
                        status={status}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <div className="w-56 flex-shrink-0">
              <div className="sticky right-[10px] top-[70px]">
                <MenuItems items={menu} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Menu;
