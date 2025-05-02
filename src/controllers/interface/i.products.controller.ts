import { Request, Response } from "express";
import { IBaseController } from "./i.base.controller";
import { PaginatedProductsResponse } from "services/interface/i.products.service";

export interface IProductController<T> extends IBaseController<T> {
  getByPagination(req: Request, res: Response): Promise<PaginatedProductsResponse>;
  getProductsByCategory(req: Request, res: Response): Promise<T[]>;
  getProductsByIds(req: Request, res: Response): Promise<T[]>;
  getProductsByPriceRange(req: Request, res: Response): Promise<T[]>;
  getProductsByBusinessesId(req: Request, res: Response): Promise<T[]>;
  postComment(req: Request, res: Response): Promise<any>;
  deleteComment(req: Request, res: Response): Promise<any>;
}
