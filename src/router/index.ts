import express from "express";
import authentication from "./authentication.route";
import customers from "./customers.route";
import products from "./products.route";
import categories from "./categories.route";
import ordersRoute from "./orders.route";
import businessesRoute from "./businesses.route";
import cartRoute from "./cart.route";
import reviewsRoute from "./reviews.route";
// import sessionRoute from "./session.route";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  customers(router);
  products(router);
  categories(router);
  ordersRoute(router);
  businessesRoute(router);
  cartRoute(router);
  reviewsRoute(router);
  // sessionRoute(router);
  return router;
};
