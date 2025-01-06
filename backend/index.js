import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed", error.message);
  });
