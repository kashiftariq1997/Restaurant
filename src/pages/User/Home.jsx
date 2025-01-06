import React, { useEffect } from "react";
import Header from "../../components/user/Header";
import Menu from "./Menu";
import { menu, items, popularItems, extra } from "../../data";
import FeaturedCard from "../../components/user/FeaturedItemCard";
import PopulartItemCard from "../../components/user/PopulartItemCard";
import HeroSlider from "../../components/user/HeroSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuItems from "../../components/user/MenuItems";
import { NavLink } from "react-router-dom";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Redux/Products/productSlice";
const Home = () => {
  const { orders } = useSelector((state) => state.orders);
  const { products, status, error } = useSelector((state) => state.products);
  const { accessToken } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  // console.log("Products: ", products);
  // console.log("Status: ", status);
  // console.log("error: ", error);

  return (
    <>
      <section className="flex flex-col items-center text-dark z-10 min-h-[100vh] w-full">
        {accessToken && <Header />}
        {/* Home Page  */}
        <div className="w-full p-4 md:container">
          {/* Hero section  */}
          <HeroSlider />
          <Menu />
          {/* Our Menu  */}
          {/* <div className="mb-12">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold mb-6">{t("OurMenu")}</h1>
              <NavLink
                to="/menu"
                className="text-sm font-medium text-primary bg-primary/10 h-fit py-1 px-3 rounded-full cursor-pointer hover:text-white hover:bg-primary"
              >
                {t("viewAll")}
              </NavLink>
            </div>
            <div className="sticky top-0 flex gap-4 items-center overflow-auto">
              <MenuItems items={menu} />
            </div>
          </div> */}

          {/* Featured Items */}
          {/* <div className="mb-12">
            <h1 className="text-2xl font-semibold my-6">
              {t("featuredItems")}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
              <FeaturedCard items={products.data} status={status} />
            </div>
          </div> */}

          {/* Most Popular Items  */}
          {/* <div className="mb-12">
            <h1 className="text-2xl font-semibold my-6">
              {t("mostPopularItmes")}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              <PopulartItemCard items={products.data} status={status} />
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Home;
