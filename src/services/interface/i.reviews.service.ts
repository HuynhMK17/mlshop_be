import { IBaseService } from "./i.base.service";

export interface IReviewsService<T> extends IBaseService<T> {
  getReviewsByProductId(id: string): Promise<any>;
}
