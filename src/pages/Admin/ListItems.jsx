import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Toolbar from "../../common/Toolbar";
import { itemsData, options } from "../../data";
import Table from "../../common/Table";
import AddItem from "../../components/Admin/AddItem";

const ListItems = () => {
  const [row, setRow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sidebar } = useSelector((state) => state.sidebar);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { key: "name", label: "NAME" },
    { key: "category", label: "CATEGORY" },
    { key: "price", label: "PRICE" },
    { key: "status", label: "STATUS" },
  ];

  const filterInputs = [
    { name: "name", label: "Name" },
    { key: "price", label: "PRICE" },
    {
      key: "category",
      label: "CATEGORY",
      type: "select",
      options: [
        { value: "fastfood", label: "FASTFOOD" },
        {
          value: "salades",
          label: "SALADES",
        },
      ],
    },
    {
      name: "tax",
      label: "Tax",
      type: "select",
      options: [{ value: "", label: "" }],
    },
    {
      key: "itemType",
      label: "ITEM TYPE",
      type: "select",
      options: [
        { value: "veg", label: "VEG" },
        { value: "non-veg", label: "NON-VEG" },
      ],
    },
    {
      key: "isFeatured",
      label: "IS FEATURED",
      type: "select",
      options: [
        { value: "yes", label: "YES" },
        { value: "no", label: "NO" },
      ],
    },
    {
      key: "status",
      label: "STATUS",
      type: "select",
      options: [
        {
          value: "active",
          label: "Active",
        },
        {
          value: "inactive",
          label: "Inactive",
        },
      ],
    },
  ];

  const paginatedData = itemsData.slice(
    (currentPage - 1) * row,
    currentPage * row
  );

  const totalPages = Math.ceil(itemsData.length / row);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const actions = {
    view: (item) => {
      console.log("View:", item);
      navigate(`/admin/items/show/${item.id}`);
    },
    edit: (item) => console.log("Edit:", item),
    delete: (item) => console.log("Delete:", item),
  };

  return (
    <>
      <AddItem value={addItemVisible} setValue={setAddItemVisible} />
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
            <span className="text-xl text-lightGray/70"> / Items</span>
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
            onAddClick={() => setAddItemVisible(true)}
          />
          <Table
            columns={columns}
            data={paginatedData}
            actions={actions}
            pagination={{
              rowsPerPage: row,
              totalItems: itemsData.length,
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default ListItems;
