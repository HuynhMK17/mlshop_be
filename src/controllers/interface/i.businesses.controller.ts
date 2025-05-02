import { Request, Response } from "express";
import { IBaseController } from "./i.base.controller";

export interface IBusinessesController<T> extends IBaseController<T> {
  getBusinessesByEmail(req: Request, res: Response): Promise<T>;
}
