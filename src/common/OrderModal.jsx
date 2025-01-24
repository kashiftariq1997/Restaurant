import React, { useState } from "react";

const OrderModal = ({ isOpen, onClose, order, actionType, onAction }) => {
  if (!isOpen) return null;

  const [showItems, setShowItems] = useState(false);

  const handleAction = () => {
    onAction(order); // Trigger the action
  };

  const toggleItems = () => {
    setShowItems((prev) => !prev); // Toggle the visibility of items
  };

  // Fields to exclude
  const excludedFields = ["createdAt", "updatedAt", "__v", "message", "_id"];

  // Function to format the keys to readable format
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add a space before capital letters
      .replace(/_/g, " ")         // Replace underscores with spaces
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[900px] h-[600px] overflow-hidden flex flex-col transform transition-transform duration-300 scale-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-300 pb-4">
          {actionType} Order
        </h2>

        {/* Order details */}
        <div className="flex-1 grid grid-cols-2 gap-6 mb-6 overflow-y-auto">
          {Object.keys(order).map((key) => {
            if (excludedFields.includes(key)) return null; // Skip excluded fields

            const value = order[key];

            // Render 'items' field with detailed item meta data
            if (key === "items" && Array.isArray(value)) {
              return (
                <div key={key} className="col-span-2">
                  <strong className="text-xl font-semibold text-gray-700">{formatKey(key)}:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-4">
                    {value.map((item, index) => (
                      <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                        <div className="font-bold text-gray-800 text-lg">{item.name}</div>
                        <div className="text-gray-600">{item.category}</div>
                        <div className="italic text-gray-500">{item.description}</div>
                      </li>
                    ))}
                  </ul>

                  {/* Button to toggle item details visibility */}
                  <button
                    className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
                    onClick={toggleItems}
                  >
                    {showItems ? "Hide Items" : "See Items"}
                  </button>

                  {/* Conditionally render detailed items */}
                  {showItems && (
                    <ul className="list-disc pl-6 mt-4 space-y-6">
                      {value.map((item, index) => (
                        <li key={index} className="bg-white rounded-lg shadow-lg p-4">
                          <div className="flex gap-6 items-center">
                          <img
                            src={item.image || "/path/to/placeholder-image.jpg"} // Fallback image if `item.image` is missing
                            alt={item.name || "Item image"}
                            className="w-[100px] h-[100px] object-cover rounded-lg shadow-md border border-gray-200"
                            onError={(e) => (e.target.src = "/path/to/placeholder-image.jpg")} // Fallback for broken image URLs
                          />
                            <div className="flex flex-col space-y-2">
                              <span className="font-bold text-lg text-gray-800">{item.name}</span>
                              <span className="text-gray-600">{item.category}</span>
                              <span className="italic text-gray-500">{item.description}</span>
                              <span className="font-semibold text-gray-700">Price: ${item.price}</span>
                              <span className="text-gray-600">Quantity: {item.quantity}</span>
                              <div>
                                <strong className="text-gray-700">Selected Size:</strong>
                                {item.selectedSize ? (
                                  <ul className="list-disc pl-4 text-gray-600">
                                    <li>
                                      {item.selectedSize.size} - ${item.selectedSize.price}
                                    </li>
                                  </ul>
                                ) : (
                                  <p className="italic text-gray-500">No size selected</p>
                                )}
                              </div>
                              <div>
                                <strong className="text-gray-700">Selected Extras:</strong>
                                {item.selectedExtras?.length > 0 ? (
                                  <ul className="list-disc pl-4 text-gray-600">
                                    {item.selectedExtras.map((extra, idx) => (
                                      <li key={idx}>
                                        {extra.name} - ${extra.price}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="italic text-gray-500">No extras selected</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            // Render other fields (phone, address, etc.)
            return (
              <div key={key} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
                <strong className="text-gray-700 font-medium">{formatKey(key)}:</strong>
                <span className="text-gray-600">{value}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            className="bg-green-500 text-gray-500 px-8 py-3 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            onClick={handleAction}
          >
            Confirm {actionType}
          </button>
          <button
            className="bg-red-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
