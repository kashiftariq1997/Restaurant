import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const CustomSize = ({ register, setSizes: updateSizes, sizes: initialSizes }) => {
  // Extract the size property from initialSizes (array of objects)
  const [sizes, setSizes] = useState(
    initialSizes.map((item) => item.size) || ["Small", "Medium", "Large"]
  );

  // Helper function to compare arrays
  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
  };

  useEffect(() => {
    if (!areArraysEqual(sizes, initialSizes.map((item) => item.size))) {
      updateSizes(
        "sizes",
        sizes.map((size) => ({ size })) // Update to match original structure
      );
    }
  }, [sizes, initialSizes, updateSizes]);

  const handleAddSize = () => {
    setSizes([...sizes, "New Size"]);
  };

  const handleRemoveSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index, newValue) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = newValue;
    setSizes(updatedSizes);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-lightGray">SIZES</label>
      <div className="flex flex-col gap-2">
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
              className="border border-lightGray/20 p-2 rounded-md text-sm text-lightGray w-full"
            />
            <button
              type="button"
              onClick={() => handleRemoveSize(index)}
              className="text-orange text-sm"
            >
              <IoClose />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSize}
          className="text-white bg-green rounded-md w-fit px-4 py-1 text-sm mt-2"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CustomSize;