import { reviewsController } from "../controllers/reviews.controller";
import express from "express";

export default (router: express.Router) => {
  router
    .post("/reviews", reviewsController.create.bind(reviewsController))
    .get("/reviews", reviewsController.getAll.bind(reviewsController))
    .get("/reviews/:id", reviewsController.getById.bind(reviewsController))
    .delete("/reviews/:id", reviewsController.delete.bind(reviewsController))
    .put("/reviews/:id", reviewsController.update.bind(reviewsController))
    .get(
      "/reviews-product/:id",
      reviewsController.getReviewsByProductId.bind(reviewsController)
    );
};
