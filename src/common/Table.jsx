import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import {updateOrderStatus} from "../Redux/Orders/ordersSlice"

const statusValues = ["Pending", "Approved", "Preparing", "Delivering", "Delivered"];

const Table = ({
  columns,
  data,
  actions,
  pagination,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [dropdownRowId, setDropdownRowId] = useState(null);

  const toggleDropdown = (rowId) => {
    setDropdownRowId((prevId) => (prevId === rowId ? null : rowId));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow/10 text-yellow border border-yellow";
      case "Approved":
        return "bg-blue/10 text-blue border border-blue";
      case "Preparing":
        return "bg-orange/10 text-orange border border-orange";
      case "Delivering":
        return "bg-purple/10 text-purple border border-purple";
      case "Delivered":
        return "bg-green/10 text-green border border-green";
      default:
        return "bg-lightGray/10 text-lightGray border border-lightGray";
    }
  };

  const handleStatusChange = async (rowId, newStatus) => {
    const confirmed = window.confirm(`Are you sure you want to update the status to "${newStatus}"?`);
    if (confirmed) {
      // Dispatch the action for status update
      const data = {
        id: rowId,
        status: newStatus,
      }
      await dispatch(updateOrderStatus(data)); // Call updateOrderStatus action with dispatch
    }
  };

  return (
    <div className=" bg-white shadow-md rounded-md w-full">
      <table className="w-full border-collapse text-lightGray uppercase">
        <thead>
          <tr className="border-b border-lightGray/20">
            {columns.map((column) => (
              <th key={column.key} className="text-left px-4 py-3 text-xs">
                {column.label}
              </th>
            ))}
            {actions && <th className="text-left px-4 py-3 text-xs">ACTION</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row._id || row._Id}
              className={`${index % 2 === 0 ? "bg-lightGray/5" : ""} border-b border-lightGray/20 text-sm text-nowrap`}
            >
              {columns.map((column) => (
                <td key={column.key} className="text-left p-4">
                {column.key === "status" ? (
                  <div className="relative inline-block">
                    <span
                      onClick={() => toggleDropdown(row._id)}
                      className={`px-2 py-1 rounded-[6px] text-xs font-medium cursor-pointer ${getStatusClass(
                        row[column.key]
                      )}`}
                    >
                      {row[column.key]}
                    </span>
                    {dropdownRowId === row._id && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-lightGray rounded-md shadow-lg z-10">
                        {statusValues.map((option) => (
                          <div
                            key={option}
                            onClick={() => {
                              handleStatusChange(row._id, option); // Handle status change with confirmation
                              setDropdownRowId(null); // Close dropdown after selecting an option
                            }}
                            className="px-4 py-2 text-sm text-dark cursor-pointer hover:bg-lightGray/10"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  row[column.key]
                )}
              </td>
              ))}
              {actions && (
                <td className="text-left p-4 flex gap-2">
                  {actions.view && (
                    <button
                      title="VIEW"
                      className="bg-primary/10 text-primary rounded-md px-2 py-1"
                      onClick={() => actions.view(row)} // Pass the row data to the view action
                    >
                      <IoEyeOutline className="text-lg" />
                    </button>
                  )}
                  {actions.edit && (
                    <button
                      title="EDIT"
                      className="bg-green/10 text-green rounded-md px-2 py-1"
                      onClick={() => actions.edit(row)}
                    >
                      <FaRegEdit className="text-lg" />
                    </button>
                  )}
                  {actions.delete && (
                    <button
                      title="DELETE"
                      className="bg-orange/10 text-orange rounded-md px-2 py-1"
                      onClick={() => actions.delete(row)}
                    >
                      <MdDeleteOutline className="text-lg" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      {pagination && (
        <div className="flex w-full p-4 py-6 bg-white items-center md:justify-between justify-center">
          <p className="hidden md:block text-sm text-dark normal-case">
            Showing {(currentPage - 1) * pagination.rowsPerPage + 1} to{" "}
            {Math.min(currentPage * pagination.rowsPerPage, pagination.totalItems)} of {pagination.totalItems} entries
          </p>
          <div className="border border-lightGray/30 flex items-center rounded-md text-lightGray">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-r border-lightGray/30 h-6 w-6 px-5 py-5 text-xl grid place-content-center"
            >
              <IoIosArrowBack />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-lightGray/10 text-primary border-blue border"
                    : "text-dark"
                } border-r border-lightGray/30 h-6 w-6 px-5 py-5 text-sm grid place-content-center`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-6 w-6 px-5 py-5 text-xl grid place-content-center"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
