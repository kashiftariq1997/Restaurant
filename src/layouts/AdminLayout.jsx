import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Admin/AdminNavbar";
import Sidebar from "../components/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <div dir="ltr">
      <AdminNavbar />{" "}
      <Sidebar/>
      <div className="flex-1">
        <main>
          <Outlet />
        </main>{" "}
      </div>
    </div>
  );
};

export default AdminLayout;
