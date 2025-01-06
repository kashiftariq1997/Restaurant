import express from "express";
import {
  deleteUser,
  getAllUsers,
  signin,
  signup,
  updateUser,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);

router.use(requireAuth);

router.get("/all-users", getAllUsers);
router.patch("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

router.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
