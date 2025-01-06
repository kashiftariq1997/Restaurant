import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import apiRoutes from "./routes/index.js";
import productRoutes from "./routes/product.route.js";
import path from 'path';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api", apiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

export default app;
