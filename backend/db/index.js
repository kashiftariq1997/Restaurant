import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URL;
    if (!uri) throw new Error("MongoDB URI is not set!");
    mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
