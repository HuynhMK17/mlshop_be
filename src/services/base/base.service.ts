import { Types } from "mongoose";
import { IBaseService } from "../interface/i.base.service";

export class BaseService<T extends any> implements IBaseService<T> {
  protected model: any;

  public constructor(model: any) {
    this.model = model;
  }
  private isValidObjectId(id: any): boolean {
    return Types.ObjectId.isValid(id);
  }
  public async create(data: any): Promise<T> {
    return await this.model.create(data);
  }

  public async update(params: any): Promise<T> {
    const { id, ...updateData } = params;
    if (!this.isValidObjectId(id)) {
      throw new Error("20.Invalid ID");
    }
    return await this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  public async delete(params: any): Promise<T> {
    const id = params;
    if (!this.isValidObjectId(id)) {
      throw new Error("28.Invalid ID");
    }
    return await this.model.findByIdAndDelete(id);
  }

  public async getById(params: any): Promise<T> {
    const id = params;
    if (!this.isValidObjectId(id)) {
      throw new Error("36.Invalid ID ");
    }
    return await this.model.findById(id);
  }

  public async getAll(): Promise<any> {
    return await this.model.find();
  }
}
