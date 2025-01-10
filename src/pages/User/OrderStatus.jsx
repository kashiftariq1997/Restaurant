import React from "react";
import { useLocation } from "react-router-dom";

// Enum for Order Status
export const OrderStatusEnum = {
  PENDING: 0,
  APPROVED: 1,
  PREPARING: 2,
  DELIVERING: 3,
  DELIVERED: 4,
};

// Mapping order status string to enum value
export const statusStringToEnum = {
  "Pending": OrderStatusEnum.PENDING,
  "Approved": OrderStatusEnum.APPROVED,
  "Preparing": OrderStatusEnum.PREPARING,
  "Delivering": OrderStatusEnum.DELIVERING,
  "Delivered": OrderStatusEnum.DELIVERED,
};

const OrderStatus = () => {
  // Get order passed from the previous page
  const location = useLocation();
  const { order } = location.state || {}; // Safely retrieve the order object

  // Initialize status based on order status (map string to enum value)
  const status = order && order.status !== undefined
    ? statusStringToEnum[order.status] || OrderStatusEnum.PENDING // Default to PENDING if mapping fails
    : OrderStatusEnum.PENDING; // Default status if no order status is available

  // Function to determine the circle color based on the status
  const getCircleColor = (level) => {
    return status >= level ? "blue" : "gray";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
      <h1 className="text-3xl font-bold text-black mb-8">Order Status</h1>

      {/* Display order details */}
      <div className="mb-8 text-center">
        <p className="text-lg font-semibold">Order ID: {order ? order._id : "Unknown"}</p>
        <p className="text-md">Phone Number: {order ? order.phone : "Unknown"}</p>
      </div>

      {/* SVG for order status circles */}
      <div className="flex justify-center items-center mb-8">
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="250"
            cy="250"
            r="100"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.APPROVED)} // Circle 1 (APPROVED)
            strokeWidth="8"
          />
          <circle
            cx="250"
            cy="250"
            r="125"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.PREPARING)} // Circle 2 (PREPARING)
            strokeWidth="8"
          />
          <circle
            cx="250"
            cy="250"
            r="150"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.DELIVERING)} // Circle 3 (DELIVERING)
            strokeWidth="8"
          />
          <circle
            cx="250"
            cy="250"
            r="175"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.DELIVERED)} // Circle 4 (DELIVERED)
            strokeWidth="8"
          />
          <text
            x="250"
            y="250"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="black"
            fontSize="24"
            fontWeight="bold"
          >
            {Object.keys(OrderStatusEnum).find(key => OrderStatusEnum[key] === status)}
          </text>
        </svg>
      </div>

      {/* Displaying the current status */}
      <h2 className="text-xl font-semibold text-black">
        Current Status: {Object.keys(OrderStatusEnum).find(key => OrderStatusEnum[key] === status)}
      </h2>
    </div>
  );
};

export default OrderStatus;
