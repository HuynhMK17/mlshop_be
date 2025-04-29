import {
  createNewCategory,
  getAllCategories,
} from "../controllers/categories.controller";
import express from "express";

export default (router: express.Router) => {
  router.get("/categories", getAllCategories);
  router.post("/categories", createNewCategory);
};
