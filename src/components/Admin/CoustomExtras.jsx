import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CustomExtras = ({ initialExtras, updateExtras }) => {
  // Local state for extras
  const [extras, setExtras] = useState(
    initialExtras.length > 0 ? initialExtras : [{ name: "", price: "" }]
  );

  // Add a new extra entry
  const handleAddExtra = () => {
    setExtras((prevExtras) => [...prevExtras, { name: "", price: "" }]);
  };

  // Remove an extra entry
  const handleRemoveExtra = (index) => {
    const updatedExtras = extras.filter((_, i) => i !== index);
    setExtras(updatedExtras);
    updateExtras(updatedExtras); // Update parent state
  };

  // Handle changes to name or price
  const handleChange = (index, field, value) => {
    const updatedExtras = [...extras];
    updatedExtras[index][field] = field === "price" ? parseFloat(value) || "" : value;
    setExtras(updatedExtras);
    updateExtras(updatedExtras); // Update parent state
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-xs text-lightGray">EXTRAS</label>
      <div className="flex flex-col gap-2">
        {extras.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Name Input */}
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              placeholder="Enter extra name (e.g., Cheese, Sauce)"
              className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray w-full"
            />
            {/* Price Input */}
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
              placeholder="Enter price"
              className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray w-full"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemoveExtra(index)}
              className="text-orange text-sm"
            >
              <IoClose />
            </button>
          </div>
        ))}
        {/* Add Extra Button */}
        <button
          type="button"
          onClick={handleAddExtra}
          className="text-white bg-green rounded-md w-fit px-4 py-1 text-sm mt-2"
        >
          Add Extra
        </button>
      </div>
    </div>
  );
};

export default CustomExtras;
