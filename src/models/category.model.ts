import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const CategoryModal = mongoose.model("Category", CategorySchema);

export const getCategories = () => CategoryModal.find();
export const createCategory = (values: Record<string, any>) =>
  new CategoryModal(values).save().then((category) => category.toObject());
