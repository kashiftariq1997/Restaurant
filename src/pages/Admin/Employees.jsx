import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Table from "../../common/Table";
import Toolbar from "../../common/Toolbar";
import { useSelector } from "react-redux";
import { users, options } from "../../data";

const Employees = () => {
  const [row, setRow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sidebar } = useSelector((state) => state.sidebar);

  const columns = [
    { key: "name", label: "NAME" },
    { key: "email", label: "EMAIL" },
    { key: "phone", label: "PHONE" },
    { key: "status", label: "STATUS" },
  ];

  const filterInputs = [
    { name: "name", label: "NAME" },
    { name: "email", label: "email" },
    { name: "phone", label: "phone" },
    {
      key: "status",
      label: "STATUS",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  ];

  const paginatedData = users.slice((currentPage - 1) * row, currentPage * row);

  const totalPages = Math.ceil(users.length / row);

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
          <span className="text-xl text-lightGray/70"> / Employees</span>
        </div>
        <Toolbar
          title="Items"
          row={true}
          filter={true}
          filterInputs={filterInputs}
          addItem={true}
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
            totalItems: users.length,
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Employees;
