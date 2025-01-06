import express from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/add", addOrder);
router.get("/get", getAllOrders);
router.get("/get/:id", getOrderById);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
