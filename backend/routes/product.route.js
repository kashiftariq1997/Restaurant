import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateDishOfTheDay,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.get("/get/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.patch("/update/dishOfTheDay/:id", updateDishOfTheDay);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
