import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    isAdmin: { type: Boolean, required: true, default: false },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
