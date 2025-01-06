import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaShop } from "react-icons/fa6";
import { languages } from "../../data";
import { PiListDashesFill } from "react-icons/pi";
import { AiOutlineAlignLeft } from "react-icons/ai";
import profile from "../../assets/profile (1).png";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../Redux/Other/sidebarSlice";

const AdminNavbar = () => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const dispatch = useDispatch();

  return (
    <nav className="sticky top-0 shadow-sm bg-white flex p-4 justify-between items-center gap-2">
      <Link to="/home" className="h-[50px] w-[125px]">
        <img className="h-full w-full object-contain" src={logo} alt="logo" />
      </Link>
      <div className="flex gap-4 items-center">
        <FaShop className="hidden md:block text-primary text-2xl" />
        <select
          name="branch"
          id="dakar"
          className="hidden md:block bg-transparent text-xs font-medium cursor-pointer"
        >
          <option value="dafa">Dakar</option>
        </select>
        {/* langugae  */}
        <button
          className="relative hidden md:flex items-center gap-2 bg-primary/10 rounded-lg p-3"
          onClick={() => setLanguageDropdown((prev) => !prev)}
        >
          <div className="h-4 w-4">
            <img
              className="h-full w-full object-contain"
              src={language.icon}
              alt="icon"
            />
          </div>
          <h4 className="text-xs font-medium">{language.name}</h4>
          {/* language drop down  */}
          {languageDropdown && (
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
        </button>
        <Link
          to=""
          className="hidden md:block p-3 text-yellow text-lg bg-yellow/10 rounded-lg"
        >
          <PiListDashesFill />
        </Link>
        <button
          className="p-3 text-primary text-lg bg-primary/10 rounded-lg"
          onClick={() => dispatch(toggleSidebar())}
        >
          <AiOutlineAlignLeft />
        </button>
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <div className="rounded-lg h-10 w-10  overflow-hidden">
            <img src={profile} alt="Image" className="h-full w-full object-cover" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm">Hello</p>
            <p className="text-sm font-medium">Muhammad Admin...</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
