import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CustomSize = ({ initialSizes, updateSizes }) => {
  // Local state for sizes
  const [sizes, setSizes] = useState(
    initialSizes.length > 0 ? initialSizes : [{ size: "", price: "" }]
  );

  // Add a new size entry
  const handleAddSize = () => {
    setSizes((prevSizes) => [...prevSizes, { size: "", price: "" }]);
  };

  // Remove a size entry
  const handleRemoveSize = (index) => {
    const updatedSizes = sizes.filter((_, i) => i !== index);
    setSizes(updatedSizes);
    updateSizes(updatedSizes); // Update parent state
  };

  // Handle changes to size or price
  const handleChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = field === "price" ? parseFloat(value) || "" : value;
    setSizes(updatedSizes);
    updateSizes(updatedSizes); // Update parent state
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-xs text-lightGray">SIZES</label>
      <div className="flex flex-col gap-2">
        {sizes.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Size Input */}
            <input
              type="text"
              value={item.size}
              onChange={(e) => handleChange(index, "size", e.target.value)}
              placeholder="Enter size (e.g., Small, Medium)"
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
              onClick={() => handleRemoveSize(index)}
              className="text-orange text-sm"
            >
              <IoClose />
            </button>
          </div>
        ))}
        {/* Add Size Button */}
        <button
          type="button"
          onClick={handleAddSize}
          className="text-white bg-green rounded-md w-fit px-4 py-1 text-sm mt-2"
        >
          Add Size
        </button>
      </div>
    </div>
  );
};

export default CustomSize;
