import mongoose from "mongoose";

const extraSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
});

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    tax: { type: String, required: false, trim: true },
    image: { type: String, required: true, trim: true },
    type: { type: String, default: "veg", trim: true },
    isFeatured: { type: Boolean, default: false, trim: true },
    status: { type: String, default: "active", trim: true },
    sizes: [sizeSchema],
    extras: [extraSchema],
    caution: { type: String, trim: true },
    description: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    isDishOfTheDay: { type: Boolean, default: false, trim: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
