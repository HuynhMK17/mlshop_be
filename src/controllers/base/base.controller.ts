import { IBaseController } from "../interface/i.base.controller";
import { Request, Response } from "express";

export abstract class BaseController<T> implements IBaseController<T> {
  protected service: any;
  public constructor(service: any) {
    this.service = service;
  }

  getAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const items = await this.service.getAll();
      return res.status(200).json(items);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };

  getById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (item) {
        return res.status(200).json(item);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("📦 Incoming customer:", req.body);
      const item = await this.service.create(req.body);
      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const updatedItem = await this.service.update(id, req.body);
      if (updatedItem) {
        return res.status(200).json(updatedItem);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };

  delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const deletedItem = await this.service.delete(id);
      if (deletedItem) {
        return res.status(200).json(deletedItem);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}
