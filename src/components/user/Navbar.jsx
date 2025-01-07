import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { IoMdCloseCircleOutline, IoIosArrowDown } from "react-icons/io";
import { CiLogin, CiLogout, CiSearch } from "react-icons/ci";
import { FaBagShopping } from "react-icons/fa6";
import {
  PiUserCircleFill,
  PiAddressBookTabsLight,
  PiKey,
  PiStackFill,
} from "react-icons/pi";
import { languages } from "../../data.js";
import dp from "../../assets/profile.png";
import { TbLayoutDashboard, TbBrandWechat } from "react-icons/tb";
import { LiaConciergeBellSolid } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import Cart from "./Cart.jsx";
import { TiHome } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLng } from "../../Redux/Language/lngSlice.js";
import { logoutUser } from "../../Redux/Users/userSlice";

const Navbar = () => {
  const [cart, setCart] = useState(false);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState(languages[0]);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleLanguage = (e) => {
    setLanguage(e);
    i18n.changeLanguage(e.lng);
    dispatch(setLng(e.lng));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    // Redirect the user to the login or home page
    window.location.href = "/login"; // or use react-router for navigation
  };

  const { totalPrice } = useSelector((state) => state.cart);

  const { profile, accessToken } = useSelector((state) => state.users);

  //const user = accessToken ? JSON.parse(sessionStorage.getItem("user")) : null;

  //console.log(user);

  // if (user) {
  //   console.log("Logged-in User:", user);
  //   // Render user-specific UI
  // } else {
  //   console.log("No user is logged in or token is missing.");
  //   // Render guest UI
  // }

  // console.log("Profile: ", profile, "AccessToken: ", accessToken);
  return (
    <>
      {cart && <Cart setCart={setCart} />}
      <nav className="sticky top-0 flex justify-center bg-white w-full p-3 z-30 lg:z-50 shadow-sm">
        <div className="w-full max-w-[1150px] flex flex-col  lg:flex-row gap-4 lg:items-center justify-between">
          {/* logo  */}
          <Link to="/home" className="h-[50px] w-[125px]">
            <img
              className="h-full w-full object-contain"
              src={logo}
              alt="logo"
            />
          </Link>

          {/* navlinks  */}
          <ul className="hidden lg:flex gap-6 text-sm font-medium">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-dark"
                }
              >
                {" "}
                {t("Home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-dark"
                }
              >
                {t("Dish of the Day")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trackOrders"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-dark"
                }
              >
                {t("Track Your Orders")}
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-dark"
                }
              >
                {t("Offers")}
              </NavLink>
            </li> */}
          </ul>

          {/* right  */}
          <div className="flex items-center z-50 md:z-0 right gap-3">
            {/* saerch  */}
            {/* <div className="flex items-center bg-lightGray/10 rounded-full px-2 py-[7px] text-lg w-full lg:w-[230px]">
              <CiSearch className="font-medium text-xl" />
              <input
                className="bg-transparent text-xs px-2 w-full"
                placeholder={t("Search")}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <IoMdCloseCircleOutline
                  className="text-md text-primary cursor-pointer"
                  onClick={() => setSearch("")}
                />
              )}
            </div> */}
            {/* language  */}
            {/* <button
              className="relative hidden lg:flex items-center gap-2 border border-lightGray/20 rounded-full px-3 py-[7px]"
              onClick={() => setLanguageDropdown((prev) => !prev)}
            >
              <div className="h-4 w-4">
                <img
                  className="h-full w-full object-contain"
                  src={language.icon}
                  alt="icon"
                />
              </div>
              <h4 className="text-sm font-medium">{language.name}</h4> */}
              {/* language drop down  */}
              {/* {languageDropdown && (
                <ul className="hidden lg:block absolute top-14 right-0 bg-white p-2 rounded-lg w-[180px] z-50 shadow-md">
                  {languages.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-2 items-center p-2 hover:bg-lightGray/10 rounded-lg cursor-pointer text-sm"
                      onClick={() => handleLanguage(item)}
                    >
                      <div className="h-4 w-4">
                        <img
                          className="h-full w-full object-contain"
                          src={item.icon}
                          alt="icon"
                        />
                      </div>
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </button> */}
            {/* cart */}
            <button
              className="hidden lg:flex items-center gap-2 text-white bg-dark rounded-full px-3 py-[7px]"
              onClick={() => setCart(true)}
            >
              <div className="h-4 w-4">
                <FaBagShopping />
              </div>
              <h4 className="text-sm font-medium">
                {totalPrice > 0 && totalPrice}OXOF
              </h4>
            </button>
            {/* account  */}
            {accessToken ? (
              <button
                className="relative hidden lg:flex items-center gap-2 text-white bg-secondary rounded-full px-3 py-[7px]"
                onClick={() => setAccountDropdown((prev) => !prev)}
              >
                {/* <div className="h-4 w-4"> */}
                <PiUserCircleFill />
                {/* </div> */}
                <h4 className="text-sm font-medium">Account</h4>
                <IoIosArrowDown />
                {accountDropdown && (
                  <ul className="hidden lg:block absolute top-14 right-0 bg-white p-3 rounded-xl w-[320px] shadow-md text-dark">
                    {/* profile  */}
                    <div className="flex gap-3 mb-6">
                      <div className="h-[68px] w-[68px] overflow-hidden rounded-full border border-dashed border-primary p-[2px]">
                        <img
                          className="h-full w-full object-cover rounded-full"
                          src={dp}
                          alt="Image"
                        />
                      </div>
                      <div className="flex flex-col justify-between text-start">
                        <h2 className="text-sm font-medium">
                          Mohamed Masseye DIOP
                        </h2>
                        <p className="text-xs text-lightGray">
                          admin@turquoise.sn
                        </p>
                        <h2 className="text-sm font-medium">OXOF</h2>
                      </div>
                    </div>
                    <ul className="text-sm items-start text-start px-2">
                      <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
                        <TbLayoutDashboard className="text-lg text-lightGray/80" />{" "}
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </li>
                      <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
                        <LiaConciergeBellSolid className="text-lg text-lightGray/80" />{" "}
                        <a href="">My Orders</a>
                      </li>
                      <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
                        <FiEdit className="text-lg text-lightGray/80" />{" "}
                        <a href="">Edit Profile</a>
                      </li>
                      <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
                        <TbBrandWechat className="text-lg text-lightGray/80" />{" "}
                        <a href="">Chat</a>
                      </li>
                      <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
                        <PiAddressBookTabsLight className="text-lg text-lightGray/80" />{" "}
                        <a href="">Address</a>
                      </li>
                      <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
                        <PiKey className="text-lg text-lightGray/80" />{" "}
                        <a href="">Change Password</a>
                      </li>
                      <li onClick={handleLogout} className="flex items-center gap-3 pt-2 hover:text-primary transition-none">
                        <CiLogout className="text-lg text-lightGray/80" />{" "}
                        <a href="">Logout</a>
                      </li>
                    </ul>
                  </ul>
                )}
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex items-center gap-2 text-white bg-secondary rounded-full px-3 py-[7px]"
              >
                <div className="h-4 w-4">
                  <CiLogin />
                </div>
                <h4 className="text-sm font-medium">Login</h4>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <nav className="fixed lg:hidden bottom-0 w-full bg-white shadow-hard">
        <ul className="relative flex justify-between py-3 px-4 text-lightGray">
          {/* Home */}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-xs flex flex-col items-center transition-none ${
                isActive ? "text-primary" : "text-lightGray"
              }`
            }
          >
            <TiHome className="text-xl" /> Home
          </NavLink>

          {/* Menu */}
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `text-xs flex flex-col items-center transition-none ${
                isActive ? "text-primary" : "text-lightGray"
              }`
            }
          >
            <PiStackFill className="text-xl" /> Menu
          </NavLink>

          {/* Cart */}
          <li
            className="text-xs flex flex-col items-center"
            onClick={() => setCart(true)}
          >
            <FaBagShopping className="absolute shadow-hard top-[-20px] text-xl h-12 w-12 rounded-full text-white bg-secondary p-4" />
          </li>

          {/* Offers */}
          {/* <NavLink
            to="/offers"
            className={({ isActive }) =>
              `text-xs flex flex-col items-center transition-none ${
                isActive ? "text-primary" : "text-lightGray"
              }`
            }
          >
            <MdLocalOffer className="text-xl" />
            Offers
          </NavLink> */}

          {/* Profile */}
          <li
            className="text-xs flex flex-col items-center"
            onClick={() => setProfileDropDown(true)}
          >
            <FaUserCircle className="text-xl" />
            Profile
          </li>
        </ul>
      </nav>

      {profileDropDown && (
        <ul className="lg:hidden fixed z-50 bg-white p-8 rounded-xl w-full h-full shadow-md text-dark">
          <div
            className="absolute top-4 right-4 bg-orange text-white rounded-full w-fit p-1"
            onClick={() => setProfileDropDown(false)}
          >
            <IoClose />
          </div>
          {/* profile  */}
          <div className="flex gap-3 mb-6">
            <div className="h-[68px] w-[68px] overflow-hidden rounded-full border border-dashed border-primary p-[2px]">
              <img
                className="h-full w-full object-cover rounded-full"
                src={dp}
                alt="Image"
              />
            </div>
            <div className="flex flex-col justify-between text-start">
              <h2 className="text-sm font-medium">Mohamed Masseye DIOP</h2>
              <p className="text-xs text-lightGray">admin@turquoise.sn</p>
              <h2 className="text-sm font-medium">OXOF</h2>
            </div>
          </div>
          <ul className="text-sm items-start text-start px-2">
            <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
              <TbLayoutDashboard className="text-lg text-lightGray/80" />{" "}
              <a href="">Dashboard</a>
            </li>
            <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
              <LiaConciergeBellSolid className="text-lg text-lightGray/80" />{" "}
              <a href="">My Orders</a>
            </li>
            <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
              <FiEdit className="text-lg text-lightGray/80" />{" "}
              <a href="">Edit Profile</a>
            </li>
            <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
              <TbBrandWechat className="text-lg text-lightGray/80" />{" "}
              <a href="">Chat</a>
            </li>
            <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
              <PiAddressBookTabsLight className="text-lg text-lightGray/80" />{" "}
              <a href="">Address</a>
            </li>
            <li className="flex items-center gap-3 py-3 border-b border-lightGray/20 hover:text-primary transition-none">
              <PiKey className="text-lg text-lightGray/80" />{" "}
              <a href="">Change Password</a>
            </li>
            <li onClick={handleLogout} className="flex items-center gap-3 pt-2 hover:text-primary transition-none">
              <CiLogout className="text-lg text-lightGray/80" />{" "}
              <a href="" onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </ul>
      )}
    </>
  );
};

export default Navbar;
