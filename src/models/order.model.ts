// order.model.ts
import mongoose, { Schema } from "mongoose";
import { IOrder } from "./interfaces/order.interface";

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  options: { type: String, required: false },
  size: { type: String, required: false },
  color: { type: String, required: false },
  material: { type: String, required: false },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema({
  customerId: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },

  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    required: true,
  },
  orderDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
