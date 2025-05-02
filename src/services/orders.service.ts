import { OrderModel } from "../models/order.model";
import { IOrder, OrderStatus } from "../models/interfaces/order.interface";
import { BaseService } from "./base/base.service";
import { IOrderService } from "./interface/i.orders.service";

class OrderService
  extends BaseService<IOrder>
  implements IOrderService<IOrder>
{
  constructor() {
    super(OrderModel);
  }

  async getMeOrders(sessionToken: string): Promise<IOrder[]> {
    return OrderModel.find({
      "customer.authentication.sessionToken": sessionToken,
    });
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<IOrder | null> {
    const order = await OrderModel.findById(id);
    order.status = status;
    const updatedOrder = await order.save();
    return updatedOrder.toObject();
  }

  async getOrdersByCustomerId(customerId: string): Promise<IOrder[]> {
    return OrderModel.find({ customerId: customerId });
  }
}

export const orderService = new OrderService();
