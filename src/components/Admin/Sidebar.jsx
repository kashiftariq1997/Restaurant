import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { RiBox3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toggleSidebar } from "../../Redux/Other/sidebarSlice";
import { motion as m } from "framer-motion";
import { fadeIn } from "../../utils/variants";
import { FaBagShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";

const Sidebar = () => {
  const { sidebar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <>
      {sidebar && (
        <m.nav
          variants={fadeIn("right", 300, 0.05)}
          initial="hidden"
          animate="show"
          className="fixed left-0 w-64 shadow-sm px-4 py-2 h-[100vh] bg-white font-publicSans"
        >
          <button
            className="lg:hidden absolute top-[-50px] right-4 text-lg bg-lightGray/10 text-lightGray rounded-full p-1"
            onClick={() => dispatch(toggleSidebar())}
          >
            <IoClose />
          </button>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-sm text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <LuLayoutDashboard className="text-lg" />
            <h3 className="text-base">Dashboard</h3>
          </NavLink>
          <NavLink
            to="/admin/items"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <RiBox3Line className="text-lg" />
            <h3 className="text-base">Items</h3>
          </NavLink>
          <p className="text-xs uppercase my-4 text-lightGray">POS & Orders</p>
          <NavLink
            to="/admin/online-orders"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <FaBagShopping className="text-lg" />
            <h3 className="text-base">Online Orders</h3>
          </NavLink>
          <p className="text-xs uppercase my-4 text-lightGray">Users</p>
          <NavLink
            to="/admin/administrators"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <FaRegUser className="text-lg" />
            <h3 className="text-base">Administrators</h3>
          </NavLink>
          <NavLink
            to="/admin/delivery-boys"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <FiUsers className="text-lg" />
            <h3 className="text-base">Delivery Boys</h3>
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <HiOutlineUserGroup className="text-lg" />
            <h3 className="text-base">Customers</h3>
          </NavLink>
          <NavLink
            to="/admin/employees"
            className={({ isActive }) =>
              `flex gap-4 px-3 py-2 rounded-lg items-center text-lightGray ${
                isActive ? "bg-primary/10 text-primary" : ""
              }`
            }
          >
            <FiUsers className="text-lg" />
            <h3 className="text-base">Employees</h3>
          </NavLink>
        </m.nav>
      )}
    </>
  );
};

export default Sidebar;
