import { IBaseService } from "./i.base.service";

export interface IOrderService<T> extends IBaseService<T> {
  getMeOrders(sessionToken: string): Promise<T[]>;
  getOrdersByCustomerId(id: string): Promise<T[]>;
  updateOrderStatus(id: string, status: string): Promise<T>;
}
