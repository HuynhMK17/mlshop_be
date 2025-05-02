// @/models/cart.model.ts
import mongoose, { Schema } from "mongoose";
import { ICart } from "./interfaces/cart.interface";

const CartSchema = new Schema({
  customerId: { type: String, required: true },
  productId: { type: String, required: true },
  options: { type: String, required: false },
  size: { type: String, required: false },
  color: { type: String, required: false },
  material: { type: String, required: false },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createAt: { type: Date, immutable: true, default: () => Date.now() },
  updateAt: { type: Date, default: () => Date.now() },
});

export const CartModel = mongoose.model<ICart>("Cart", CartSchema);
