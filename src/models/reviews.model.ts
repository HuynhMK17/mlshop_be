import mongoose, { Document } from "mongoose";
import { IReviews } from "./interfaces/reviews.interface";

const ReviewsSchema = new mongoose.Schema({
  reviewsableId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "reviewsableType",
  },
  reviewsableType: {
    type: String,
    required: true,
    enum: ["Product"],
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews",
    default: null,
  },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

export const ReviewsModel = mongoose.model<IReviews>("Reviews", ReviewsSchema);
