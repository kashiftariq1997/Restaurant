import React, { useEffect, useState } from "react";
import MenuItems from "../../components/user/MenuItems";
import { menu } from "../../data";
import vegImg from "../../assets/veg.png";
import nonVegImg from "../../assets/non-veg.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion as m } from "framer-motion";
import { fadeIn } from "../../utils/variants";
import PopulartItemCard from "../../components/user/PopulartItemCard";
import FeaturedCard from "../../components/user/FeaturedItemCard";
import { TbLayoutGridFilled, TbLayoutListFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/Products/productSlice";
import Loader from "../../common/Loader";

const Menu = () => {
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [layout, setLayout] = useState(false);
  const { products, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [prod, setProd] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    if (products?.data) {
      setProd(products.data);
    }
  }, [products]);

  const handleVegClick = (e) => {
    e.stopPropagation();
    setVeg(!veg);
  };

  const handleNonVegClick = (e) => {
    e.stopPropagation();
    setNonVeg(!nonVeg);
  };

  // console.log("Products: ", products);
  // console.log("Categories: ", categories);

  return (
    <>
      {status === "pending" ? (
        <Loader />
      ) : (
        <section className="flex flex-col items-center text-dark z-10 h-auto w-full">
          <div className="flex flex-col items-center align-middle gap-10 w-full py-4 md:container mb-12">
            <div className="sticky top-[70px] w-full justify-center  flex gap-4 bg-white overflow-auto py-8">
              <MenuItems items={menu} />
            </div>

            {/* <div className="flex gap-3">
              <div
                className="flex items-center gap-3 bg-lightGray/10 hover:bg-white hover:shadow-lg cursor-pointer py-2 px-4 rounded-full"
                onClick={() => setNonVeg(true)}
              >
                <div className="h-6 w-6 overflow-hidden">
                  <img
                    className="h-full w-full object-contain"
                    src={vegImg}
                    alt="Image"
                  />
                </div>
                <h2 className="text-sm font-medium">Non-Veg</h2>
                {nonVeg && (
                  <m.button
                    variants={fadeIn("right")}
                    initial="hidden"
                    animate="show"
                    className="text-2xl text-primary"
                    onClick={handleNonVegClick}
                  >
                    <AiOutlineCloseCircle />
                  </m.button>
                )}
              </div>
              <div
                className="flex items-center gap-3 bg-lightGray/10 hover:bg-white hover:shadow-lg cursor-pointer py-2 px-4 rounded-full"
                onClick={() => setVeg(true)}
              >
                <div className="h-6 w-6 overflow-hidden">
                  <img
                    className="h-full w-full object-contain"
                    src={nonVegImg}
                    alt="Image"
                  />
                </div>
                <h2 className="text-sm font-medium">Veg</h2>
                {veg && (
                  <m.button
                    variants={fadeIn("right")}
                    initial="hidden"
                    animate="show"
                    className="text-2xl text-primary"
                    onClick={handleVegClick}
                  >
                    <AiOutlineCloseCircle />
                  </m.button>
                )}
              </div>
            </div> */}

            {menu?.map((item) => (
              <>
                <div
                  key={item.id}
                  className="flex self-start justify-between"
                  id={item.name}
                >
                  <h1 className="uppercase text-primary text-2xl font-semibold">
                    {item.name}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <TbLayoutListFilled
                      className={`transition-none cursor-pointer text-2xl ${
                        layout && "text-lightGray/50"
                      }`}
                      onClick={() => setLayout(false)}
                    />
                    <TbLayoutGridFilled
                      className={`transition-none cursor-pointer text-2xl ${
                        !layout && "text-lightGray/50"
                      }`}
                      onClick={() => setLayout(true)}
                    />
                  </div>
                </div>

                {layout ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
                    <FeaturedCard
                      items={prod?.filter(
                        (data) => data.category === item?.name
                      )}
                      status={status}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-wrap">
                    <PopulartItemCard
                      items={prod?.filter(
                        (data) => data.category === item?.name
                      )}
                      status={status}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Menu;
