import { businessesController } from "../controllers/businesses.controller";
import express from "express";

export default (router: express.Router) => {
  router.get(
    "/businesses",
    businessesController.getAll.bind(businessesController)
  );
  router.get(
    "/businesses/:id",
    businessesController.getById.bind(businessesController)
  );
  router.get(
    "/businesses",
    businessesController.getBusinessesByEmail.bind(businessesController)
  );
  router.post(
    "/businesses",
    businessesController.create.bind(businessesController)
  );
};
