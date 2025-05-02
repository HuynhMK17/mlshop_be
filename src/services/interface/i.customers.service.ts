import { IBaseService } from "./i.base.service";

export interface ICustomerService<T> extends IBaseService<T> {
  getCustomerByEmail(email: string): Promise<T>;
  getCustomerBySessionToken(sessionToken: string): Promise<T>;
  putProductWishList(customerId: string, productId: string): Promise<T>;
}
