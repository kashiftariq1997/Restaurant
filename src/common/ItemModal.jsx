import React from "react";

const ItemModal = ({ isOpen, onClose, item, actionType }) => {
  if (!isOpen) return null;

  // Fields to exclude from display
  const excludedFields = ["createdAt", "updatedAt", "__v", "_id"];

  // Function to format field names for display
  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter

  const renderValue = (value, key) => {
    if (Array.isArray(value)) {
      // Handle arrays
      return (
        <ul className="list-disc pl-5 space-y-2">
          {value.map((subItem, index) => {
            if (typeof subItem === "object" && subItem !== null) {
              // For objects, format details
              return (
                <li key={index} className="bg-gray-50 p-2 rounded-md shadow">
                  {Object.entries(subItem).map(([subKey, subVal]) => (
                    <div key={subKey}>
                      <strong>{formatKey(subKey)}:</strong> {subVal}
                    </div>
                  ))}
                </li>
              );
            } else {
              // For primitives
              return <li key={index}>{subItem}</li>;
            }
          })}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      // Handle objects
      return (
        <ul className="list-disc pl-5">
          {Object.entries(value).map(([key, val], index) => (
            <li key={index}>
              <strong>{formatKey(key)}:</strong> {val?.toString() || "N/A"}
            </li>
          ))}
        </ul>
      );
    } else {
      // Handle primitive values
      return value?.toString() || "N/A";
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Product Image */}
        {item.image && (
          <div className="w-full h-64 bg-gray-100">
            <img
              src={item.image}
              alt={item.name || "Product Image"}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {actionType} Item
            </h2>
            <button
              className="text-red-500 font-bold text-xl"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Item Details */}
          <div className="space-y-4">
            {Object.keys(item || {}).map((key) => {
              if (excludedFields.includes(key)) return null;

              return (
                <div
                  key={key}
                  className="flex flex-col bg-gray-100 p-3 rounded-lg"
                >
                  <strong className="text-gray-700">{formatKey(key)}:</strong>
                  <span className="text-gray-600">{renderValue(item[key], key)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-gray-100 p-4 flex justify-end gap-4">
          <button
            className="bg-green-500 text-gray-500 px-4 py-2 rounded-md shadow hover:bg-green-600"
            onClick={onClose}
          >
            Confirm {actionType}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
