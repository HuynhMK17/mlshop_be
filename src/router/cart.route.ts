import { cartController } from "../controllers/cart.controller";
import express from "express";

export default (router: express.Router) => {
  router
    .get("/cart", cartController.getAll.bind(cartController))
    .get("/cart/:id", cartController.getById.bind(cartController))
    .get(
      "/cart-customer/:customerId",
      cartController.getCartByCustomerId.bind(cartController)
    )
    .delete("/cart/:id", cartController.delete.bind(cartController))
    .post("/cart/add", cartController.create.bind(cartController));
};
