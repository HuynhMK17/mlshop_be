import { customerController } from "../controllers/customers.controller";
import express from "express";

export default (router: express.Router) => {
  router
    .get("/customers", customerController.getAll)
    .post("/customers", customerController.create.bind(customerController))
    .get("/customers", customerController.getAll.bind(customerController))
    .get("/customers/:id", customerController.getById.bind(customerController))
    .delete(
      "/customers/:id",
      customerController.delete.bind(customerController)
    )
    .put("/customers/:id", customerController.update.bind(customerController))
    .get(
      "/customer-by-email",
      customerController.getCustomerByEmail.bind(customerController)
    )
    .get(
      "/customer/me",
      customerController.getCustomerBySessionToken.bind(customerController)
    )
    .put(
      "/customer-add-wishlist",
      customerController.putProductWishList.bind(customerController)
    );
};
