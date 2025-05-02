import { IBaseService } from "./i.base.service";

export interface IBusinessesService<T> extends IBaseService<T> {
  getBusinessesByEmail(email: string): Promise<T>;
}
