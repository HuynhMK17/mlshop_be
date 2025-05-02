import express from "express";
import { productService } from "../services/products.service";
import { BaseController } from "./base/base.controller";
import {
  CommentSchema,
  IProduct,
} from "../models/interfaces/product.interface";
import { IProductController } from "./interface/i.products.controller";

class ProductController
  extends BaseController<IProduct>
  implements IProductController<IProduct>
{
  constructor() {
    super(productService);
  }
  getByPagination = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
      const query = req.query as Partial<{ page: number; limit: number }>;
      const page = query.page || 1;
      const limit = query.limit || 10;
      const products = await productService.getByPagination(page, limit);
      return res.status(200).json(products);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }
  getProductsByCategory = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const query = req.query as Partial<{ category: string }>;
      const product = await productService.getProductsByCategory(
        query.category
      );
      return res.status(200).json(product);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
  getProductsByIds = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { ids } = req.body as Partial<{ ids: string[] }>;
      const product = await productService.getProductsByIds(ids);
      return res.status(200).json(product);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
  getProductsByBusinessesId = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const products = await productService.getProductsByBusinessesId(id);
      return res.status(200).json(products);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
  getProductsByPriceRange = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const body = req.body as Partial<{ minPrice: string; maxPrice: string }>;
      const min = Number(body.minPrice);
      const max = Number(body.maxPrice);
      const product = await productService.getProductsByPriceRange(min, max);
      return res.status(200).json(product);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
  postComment = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { productId, customerComment } = req.body as Partial<{
        productId: string;
        customerComment: typeof CommentSchema;
      }>;
      const product = await productService.postComment(
        productId,
        customerComment
      );
      return res.status(200).json(product);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
  deleteComment = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { productId, commentId } = req.body as Partial<{
        productId: string;
        commentId: string;
      }>;

      const product = await productService.deleteComment(productId, commentId);
      return res.status(200).json(product);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
}

export const productCotroller = new ProductController();
