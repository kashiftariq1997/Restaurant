import React from "react";
import {Footer} from "../components/user/Footer";
import Navbar from "../components/user/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const { lng } = useSelector((state) => state.lng);

  return (
    <div dir={lng === "ar" ? "rtl" : "ltr"}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
