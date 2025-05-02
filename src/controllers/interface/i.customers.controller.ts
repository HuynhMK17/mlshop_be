import { Request, Response } from "express";
import { IBaseController } from "./i.base.controller";

export interface ICustomerController<T> extends IBaseController<T> {
  getCustomerByEmail(req: Request, res: Response): Promise<T>;
  getCustomerBySessionToken(req: Request, res: Response): Promise<T>;
  putProductWishList(req: Request, res: Response): Promise<any>;
}
