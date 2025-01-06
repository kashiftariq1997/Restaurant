import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { motion as m } from "framer-motion";
import { fadeIn } from "../utils/variants";

const Toolbar = ({
  title,
  row = true,
  filter = true,
  addItem = true,
  exportOption = true,
  options = [],
  onSelectChange,
  onFilterClick,
  onAddClick,
  filterInputs = [],
}) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({});

  const handleInputChange = (name, value) => {
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    onFilterClick(filterData); // Pass filter data to the parent onFilterClick callback
  };

  return (
    <div className="bg-white border-b border-lightGray/10 flex items-center px-4 flex-wrap py-6 justify-center md:justify-between w-full border">
      <h3 className="text-lg font-medium capitalize mb-4 md:mb-0 text-lightGray">
        {title}
      </h3>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {/* Rows Selector */}
        {row && (
          <select
            onChange={(e) => onSelectChange(e.target.value)}
            className="bg-transparent border text-sm border-primary text-primary rounded-md p-2"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Filter Button */}
        {filter && (
          <button
            onClick={() => setFilterVisible(!filterVisible)}
            className="text-sm flex items-center gap-2 bg-transparent border border-primary text-primary rounded-md p-2"
          >
            <CiFilter />
            Filter
            <MdKeyboardArrowDown />
          </button>
        )}

        {/* Export Selector */}
        {exportOption && (
          <select className="bg-transparent text-sm border border-primary text-primary rounded-md p-2">
            <option value="export" disabled selected>
              Export
            </option>
            <option value="print">Print</option>
            <option value="xls">XLS</option>
          </select>
        )}

        {/* Add Item Button */}
        {addItem && (
          <button
            onClick={onAddClick}
            className="text-sm flex items-center gap-2 bg-secondary border border-secondary text-white rounded-md p-2 px-3"
          >
            <GoPlusCircle />
            Add Item
          </button>
        )}
      </div>
      {/* Dynamic Filter Inputs */}
      {filterVisible && (
        <m.div
          variants={fadeIn("down", 50, 0.1)}
          initial="hidden"
          animate="show"
          className="bg-white flex text-lightGray flex-wrap py-6 md:justify-between w-full"
        >
          <form className="flex gap-6 w-full flex-wrap justify-center">
            {filterInputs.map((input, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 flex-1 md:min-w-80 max-w-96"
              >
                <label htmlFor={input.name} className="text-xs text-start">
                  {input.label.toUpperCase()}
                </label>
                {input.type === "select" ? (
                  <select
                    id={input.name}
                    className="border bg-transparent border-lightGray/20 rounded-md px-3 py-2 text-lightGray text-sm"
                    onChange={(e) =>
                      handleInputChange(input.name, e.target.value)
                    }
                  >
                    <option value="" disabled selected>
                      --
                    </option>
                    {input.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={input.name}
                    type={input.type}
                    className="border border-lightGray/20 rounded-md px-3 py-2 text-lightGray text-sm"
                    onChange={(e) =>
                      handleInputChange(input.name, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </form>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-secondary text-white px-3 py-2 rounded-md text-sm flex items-center gap-2"
              onClick={handleFilterSubmit}
            >
              <IoIosSearch className="text-lg" /> Search
            </button>
            <button
              className="bg-dark text-white px-3 py-2 rounded-md text-sm flex items-center gap-2"
              onClick={() => setFilterVisible(!filterVisible)}
            >
              <IoIosClose className="text-lg" /> Close
            </button>
          </div>
        </m.div>
      )}
    </div>
  );
};

export default Toolbar;
