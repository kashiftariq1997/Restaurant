import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../common/Table";
import { NavLink } from "react-router-dom";
import { onlineOrders, options } from "../../data";
import Toolbar from "../../common/Toolbar";

const OnlineOrders = () => {
  const [row, setRow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sidebar } = useSelector((state) => state.sidebar);

  const columns = [
    { key: "orderId", label: "ORDER ID" },
    { key: "orderType", label: "ORDER TYPE" },
    { key: "coustomer", label: "COUSTOMER" },
    { key: "amount", label: "AMOUNT" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUs" },
  ];

  const filterInputs = [
    { name: "orderId", label: "ORDER ID" },
    {
      key: "status",
      label: "STATUS",
      type: "select",
      options: [
        { value: "accept", label: "Acceot" },
        { value: "pending", label: "Pending" },
        { value: "delivered", label: "Delivered" },
      ],
    },
    {
      key: "coustomers",
      label: "COUSTOMERS",
      type: "select",
      options: onlineOrders.map((item) => ({
        value: item.coustomer,
        label: item.coustomer,
      })),
    },
    {
      key: "date",
      label: "DATE",
      type: "date",
    },
  ];

  const paginatedData = onlineOrders.slice(
    (currentPage - 1) * row,
    currentPage * row
  );

  const totalPages = Math.ceil(onlineOrders.length / row);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const actions = {
    view: (item) => console.log("View:", item),
  };
  return (
    <section
      className={`${
        sidebar && "lg:pl-64"
      } min-h-[100vh] flex justify-center text-center md:items-start bg-lightGray/10 font-publicSans w-[100vw]`}
    >
      <div className="p-5 h-full w-full">
        <div className="flex items-center mb-5 w-full text-center justify-center md:justify-start">
          <NavLink to="/admin/dashboard">
            <h3 className="text-xl text-dark hover:text-primary mr-2">
              Dashboard{" "}
            </h3>
          </NavLink>
          <span className="text-xl text-lightGray/70"> / Online orders</span>
        </div>
        <Toolbar
          title="Items"
          row={true}
          filter={true}
          filterInputs={filterInputs}
          addItem={false}
          exportOption={true}
          options={options}
          onFilterClick={(data) => console.log("Filter Data:", data)}
          onSelectChange={(value) => setRow(Number(value))}
        />
        <Table
          columns={columns}
          data={paginatedData}
          actions={actions}
          pagination={{
            rowsPerPage: row,
            totalItems: onlineOrders.length,
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default OnlineOrders;
