import { IBaseService } from "./i.base.service";

export interface ICartService<T> extends IBaseService<T> {
  getCartByCustomerId(customerId: string): Promise<T>;
}
