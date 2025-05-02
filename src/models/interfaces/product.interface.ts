import mongoose, { Document } from "mongoose";

export interface Variant {
  options: string[];
  color: string[];
  size: string[];
  material: string[];
}

export const VariantSchema = new mongoose.Schema(
  {
    options: { type: [String], required: true },
    color: { type: [String], required: true },
    size: { type: [String], required: true },
    material: { type: [String], required: true },
  },
  { _id: false }
);
export const CommentSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  comment: { type: String, required: true },
  rate: { type: Number, required: true },
  commentAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});
export interface IProduct extends Document {
  name: string;
  businessesId: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string[];
  variants: typeof VariantSchema;
  comments: (typeof CommentSchema)[];
  createdAt: Date;
  updatedAt: Date;
}
