import { createCategory, getCategories } from "../models/category.model";
import express from "express";

export const createNewCategory = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    const category = await createCategory({
      name,
    });
    return res.status(200).json(category).end();
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
};
export const getAllCategories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories).end();
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
};
