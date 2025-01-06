import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/User/Home";
import Menu from "./pages/User/Menu";
import Offers from "./pages/User/Offers";
import Login from "./pages/User/Login";
import ForgetPassword from "./pages/User/ForgetPassword";
import Signup from "./pages/User/Signup";
import Register from "./pages/User/Register";
import Checkout from "./pages/User/Checkout";
import MyOrders from "./pages/User/MyOrders";
import OrderInfo from "./pages/User/OrderInfo";
import Loader from "./common/Loader";
import { showToast, ToastNotification } from "./utils/ToastNotification";
import Dashboard from "./pages/Admin/Dashboard";
import ListItems from "./pages/Admin/ListItems";
import OnlineOrders from "./pages/Admin/OnlineOrders";
import Administrators from "./pages/Admin/Administrators";
import DeliveryBoys from "./pages/Admin/DeliveryBoys";
import Customers from "./pages/Admin/Customers";
import Employees from "./pages/Admin/Employees";
import ItemDetail from "./pages/Admin/ItemDetail";
import OrderStatus from "./pages/User/OrderStatus";
import OrderTrack from "./pages/User/OrderTrack";

function App() {
  const role = "admin"; // This should ideally be fetched from your authentication logic
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith("/admin") && role !== "admin") {
      showToast("Only admin can access this page!", "error");
    }
  }, [location, role]);

  return (
    <>
      {loading && <Loader />}
      <ToastNotification />
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route exact path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/:id" element={<OrderInfo />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/trackOrders" element={<OrderTrack />} />
        </Route>

        {/* Admin Routes */}
        {role === "admin" ? (
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/items" element={<ListItems />} />
            <Route path="/admin/online-orders" element={<OnlineOrders />} />
            <Route path="/admin/administrators" element={<Administrators />} />
            <Route path="/admin/delivery-boys" element={<DeliveryBoys />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/items/show/:id" element={<ItemDetail />} />
          </Route>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/home" replace />} />
        )}
      </Routes>
    </>
  );
}

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
