import { Request, Response } from "express";
import { IBaseController } from "./i.base.controller";

export interface IReviewsController<T> extends IBaseController<T> {
  getReviewsByProductId(req: Request, res: Response): Promise<any>;
}
