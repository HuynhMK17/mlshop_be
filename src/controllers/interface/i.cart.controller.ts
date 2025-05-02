import { Request, Response } from "express";
import { IBaseController } from "./i.base.controller";

export interface ICartController<T> extends IBaseController<T> {
  getCartByCustomerId(req: Request, res: Response): Promise<T>;
}
