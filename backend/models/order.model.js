import mongoose from "mongoose";

const extrasSchema = new mongoose.Schema({
  name: { type: String, trim: true, trim: true },
  price: { type: Number, trim: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: false },
});

const sizesSchema = new mongoose.Schema({
  size: { type: String, trim: true },
  price: { type: Number, trim: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: false },
});

const itemsSchema = new mongoose.Schema({
  name: { type: String, trim: true, trim: true },
  category: { type: String, trim: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true },
  price: { type: Number, trim: true },
  quantity: { type: Number, trim: true },
  sizes: [sizesSchema],
  extras: [extrasSchema],
  caution: { type: String, trim: true },
  isFeatured: { type: Boolean, default: false },
  type: { type: String, trim: true },
  tax: { type: String, trim: true },
  status: { type: String, default: "active", trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema(
  {
    phone: { type: String, trim: true },
    address: { type: String, trim: true, trim: true },
    addressType: { type: String, trim: true },
    date: { type: String, trim: true },
    deliveryCharge: { type: Number, default: 0 },
    items: { type: [itemsSchema], trim: true },
    price: { type: Number, trim: true },
    subtotal: { type: Number, trim: true },
    status: {
      type: String,
      default: "pending",
    },
    type: { type: String, trim: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
