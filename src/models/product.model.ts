import mongoose, { Document } from "mongoose";
import { IProduct, VariantSchema } from "./interfaces/product.interface";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessesId: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: String, required: false },
  stock: { type: Number, required: false },
  image: { type: [String], required: false },
  variants: { type: VariantSchema, required: false },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
