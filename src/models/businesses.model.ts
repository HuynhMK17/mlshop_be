// @/models/businesses.model.ts
import mongoose from "mongoose";
import { IBusinesses } from "./interfaces/businesses.interface";

const BusinessesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
    role: { type: String, select: false, default: "businesses" },
  },
  phone: { type: String, select: true },
  website: { type: String, required: false },
  category: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    detail: { type: String, required: false },
  },
  createAt: { type: Date, immutable: true, default: () => Date.now() },
  updateAt: { type: Date, default: () => Date.now() },
});

export const BusinessesModel = mongoose.model<IBusinesses>(
  "Businesses",
  BusinessesSchema
);
