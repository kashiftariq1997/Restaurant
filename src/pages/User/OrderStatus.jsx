import React, { useState } from "react";

// Enum for Order Status
const OrderStatusEnum = {
  IN_PROGRESS: 0,
  APPROVED: 1,
  PREPARING: 2,
  DELIVERING: 3,
  DELIVERED: 4,
};

const OrderStatus = () => {
  // Initialize state with a default value
  const [status, setStatus] = useState(OrderStatusEnum.DELIVERED); // Change this value manually for testing

  // Function to handle status change
  const handleStatusChange = (event) => {
    setStatus(parseInt(event.target.value)); // Convert dropdown value to integer and update status
  };

  // Function to determine the circle color based on the status
  const getCircleColor = (level) => {
    return status >= level ? "blue" : "gray";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
      <h1 className="text-3xl font-bold text-black mb-8">Order Status</h1>

      {/* Dropdown to select the order status */}
      <div className="mb-8">
        <label htmlFor="statusDropdown" className="mr-4 text-black font-semibold">Select Order Status:</label>
        <select
          id="statusDropdown"
          value={status}
          onChange={handleStatusChange}
          className="p-2 border rounded-md bg-white"
        >
          {Object.entries(OrderStatusEnum).map(([key, value]) => (
            <option key={value} value={value}>
              {key.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* SVG for order status circles */}
      <div className="flex justify-center items-center mb-8">
        <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="300"
            cy="300"
            r="100"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.APPROVED)} // Circle 1 (APPROVED)
            strokeWidth="8"
          />
          <circle
            cx="300"
            cy="300"
            r="125"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.PREPARING)} // Circle 2 (PREPARING)
            strokeWidth="8"
          />
          <circle
            cx="300"
            cy="300"
            r="150"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.DELIVERING)} // Circle 3 (DELIVERING)
            strokeWidth="8"
          />
          <circle
            cx="300"
            cy="300"
            r="175"
            fill="none"
            stroke={getCircleColor(OrderStatusEnum.DELIVERED)} // Circle 4 (DELIVERED)
            strokeWidth="8"
          />
        </svg>
      </div>

      {/* Displaying the current status */}
      <h2 className="text-xl font-semibold text-black">
        Current Status: {Object.keys(OrderStatusEnum)[status]}
      </h2>
    </div>
  );
};

export default OrderStatus;
