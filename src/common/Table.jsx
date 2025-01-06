import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const Table = ({
  columns,
  data,
  actions,
  pagination,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getStatusClass = (key, value) => {
    if (key === "status") {
      switch (value.toLowerCase()) {
        case "active":
          return "bg-green/10 text-green border border-green";
        case "pending":
          return "bg-yellow/10 text-yellow border border-yellow";
        case "delivered":
          return "bg-primary/10 text-primary border border-primary";
        case "accept":
          return "bg-green/10 text-green border border-green";
        case "inactive":
          return "bg-primary/10 text-primary border border-primary";
        default:
          return "bg-lightGray/10 text-lightGray border border-lightGray";
      }
    } else if (key === "orderType") {
      switch (value.toLowerCase()) {
        case "delivery":
          return "bg-green/10 text-green border border-green";
        case "takeaway":
          return "bg-orange/10 text-orange border border-orange";
        default:
          return "bg-lightGray/10 text-lightGray border border-lightGray";
      }
    }
    return "";
  };

  return (
    <div className="bg-white shadow-md rounded-md w-full overflow-auto">
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
              key={row.id || row.orderId}
              className={`${
                index % 2 === 0 ? "bg-lightGray/5" : ""
              } border-b border-lightGray/20 text-sm text-nowrap`}
            >
              {columns.map((column) => (
                <td key={column.key} className="text-left p-4">
                  {["status", "orderType"].includes(column.key) ? (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        column.key,
                        row[column.key]
                      )}`}
                    >
                      {row[column.key]}
                    </span>
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
                      onClick={() => actions.view(row)}
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
            {Math.min(
              currentPage * pagination.rowsPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} entries
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
