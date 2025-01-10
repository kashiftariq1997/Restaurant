import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../common/Table";
import OrderModal from "../../common/OrderModal"; // Adjust path
import { NavLink } from "react-router-dom";
import Toolbar from "../../common/Toolbar";
import { fetchAllOrders } from "../../redux/Orders/ordersSlice";

const OnlineOrders = () => {
  const [row, setRow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { orders = [], status, error } = useSelector((state) => state.orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order); // Set the selected order data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedOrder(null); // Clear selected order
  };

  const columns = [
    { key: "_id", label: "ORDER ID" },
    { key: "type", label: "ORDER TYPE" },
    { key: "phone", label: "CUSTOMER" },
    { key: "price", label: "AMOUNT" },
    { key: "date", label: "DATE" },
    { key: "status", label: "STATUS" },
  ];

  const paginatedData = orders.slice(
    (currentPage - 1) * row,
    currentPage * row
  );
  const totalPages = Math.ceil(orders.length / row);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const actions = {
    view: handleViewOrder, // Pass the view order handler
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="min-h-[100vh] flex justify-center text-center bg-lightGray/10 font-publicSans w-[100vw]">
      <div className="p-5 h-full w-full">
        <div className="flex items-center mb-5 w-full text-center justify-center">
          <NavLink to="/admin/dashboard">
            <h3 className="text-xl text-dark hover:text-primary mr-2">
              Dashboard
            </h3>
          </NavLink>
          <span className="text-xl text-lightGray/70"> / Online Orders</span>
        </div>
        <Toolbar
          title="Items"
          row={true}
          filter={true}
          filterInputs={[]}
          addItem={false}
          exportOption={true}
          options={[]}
          onSelectChange={(value) => setRow(Number(value))}
        />
        <Table
          columns={columns}
          data={paginatedData}
          actions={actions}
          pagination={true}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {/* Modal here */}
        <OrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          order={selectedOrder}
          actionType="View"
          onAction={(order) => {
            console.log("Action triggered for:", order);
            closeModal(); // Close after action
          }}
        />
      </div>
    </section>
  );
};

export default OnlineOrders;
