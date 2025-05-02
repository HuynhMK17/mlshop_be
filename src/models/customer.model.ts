import mongoose from "mongoose";
import { ICustomer } from "./interfaces/customer.interface";

const CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
    role: { type: String, select: false, default: "customer" },
  },
  gender: { type: String, required: false },
  birthday: { type: Date, required: false },
  address: {
    street: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    detail: { type: String, required: false },
  },
  wishList: { type: [String], required: false },
  createAt: { type: Date, immutable: true, default: () => Date.now() },
  updateAt: { type: Date, default: () => Date.now() },
});

export const CustomerModel = mongoose.model<ICustomer>(
  "Customer",
  CustomerSchema
);
