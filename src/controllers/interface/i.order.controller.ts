import { Request, Response } from "express";
import { IBaseController } from "./i.base.controller";

export interface IOrderController<T> extends IBaseController<T> {
  getMeOrders(req: Request, res: Response): Promise<T[]>;
  checkout(req: Request, res: Response): Promise<any>;
  getOrdersByCustomerId(req: Request, res: Response): Promise<T[]>;
  updateOrderStatus(req: Request, res: Response): Promise<T>;
}
