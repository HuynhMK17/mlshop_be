import express from "express";
import { productCotroller } from "../controllers/products.controller";

export default (router: express.Router) => {
  router
    .post("/products", productCotroller.create.bind(productCotroller))
    .get("/products", productCotroller.getAll.bind(productCotroller))
    .get("/products/:id", productCotroller.getById.bind(productCotroller))
    .put("/products/:id", productCotroller.update.bind(productCotroller))
    .delete("/products/:id", productCotroller.delete.bind(productCotroller))
    .get("/products-pagination", productCotroller.getByPagination.bind(productCotroller))
    .get(
      "/products-category",
      productCotroller.getProductsByCategory.bind(productCotroller)
    )
    .post(
      "/products-by-ids",
      productCotroller.getProductsByIds.bind(productCotroller)
    )
    .get(
      "/products-businesses/:id",
      productCotroller.getProductsByBusinessesId.bind(productCotroller)
    )
    .get(
      "/products-by-range",
      productCotroller.getProductsByPriceRange.bind(productCotroller)
    )
    .put(
      "/product-comment",
      productCotroller.postComment.bind(productCotroller)
    )
    .delete(
      "/product-comment-delete",
      productCotroller.deleteComment.bind(productCotroller)
    );
};
