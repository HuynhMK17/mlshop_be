import { Request, Response } from "express";

export interface IBaseController<T> {
  getAll(req: Request, res: Response): Promise<any>;
  getById(req: Request, res: Response): Promise<T>;
  create(req: Request, res: Response): Promise<any>;
  update(req: Request, res: Response): Promise<T>;
  delete(req: Request, res: Response): Promise<any>;
}
