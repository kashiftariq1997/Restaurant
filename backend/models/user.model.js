import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, unique: true, sparse: true }, // `sparse` allows multiple null values
    phone: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, required: true, default: false },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
