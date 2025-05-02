import { orderController } from "../controllers/orders.controller";
import express from "express";

export default (router: express.Router) => {
  router
    .post("/orders", orderController.create.bind(orderController))
    .get("/orders", orderController.getAll.bind(orderController))
    .get("/orders/:id", orderController.getById.bind(orderController))
    .delete("/orders/:id", orderController.delete.bind(orderController))
    .post(
      "/orders-checkout/:cartId",
      orderController.checkout.bind(orderController)
    )
    .put("/orders/:id", orderController.update.bind(orderController))
    .get("/orders/me", orderController.getMeOrders.bind(orderController))
    .put(
      "/orders-update-status",
      orderController.getMeOrders.bind(orderController)
    )
    .get(
      "/orders-customer/:customerId",
      orderController.getOrdersByCustomerId.bind(orderController)
    );
};
