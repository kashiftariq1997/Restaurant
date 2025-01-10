import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  getOrdersByPhone,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/add", addOrder);
router.get("/get", getAllOrders);
router.get("/get/id/:id", getOrderById);
router.get("/get/phone/:phone", getOrdersByPhone);
router.put("/update/:id", updateOrder);
router.patch("/update/status/:id", updateOrderStatus);
router.delete("/delete/:id", deleteOrder);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
