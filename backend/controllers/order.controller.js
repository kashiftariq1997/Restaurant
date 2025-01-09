import Order from "../models/order.model.js";

export const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Faild to fetch ordres",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Order",
      error: error.message,
    });
  }
};

export const getOrdersByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const orders = await Order.find({ phone });
    if (!orders.length) {
      return res.status(404).json({
        message: "No orders found for this phone number",
      });
    }
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete Order",
      error: error.message,
    });
  }
};
