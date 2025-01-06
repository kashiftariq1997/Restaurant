import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type = "success", autoClose = 3000) => {
  toast[type](message, {
    position: "top-right",
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const ToastNotification = () => (
  <ToastContainer />
);

export { showToast, ToastNotification };
