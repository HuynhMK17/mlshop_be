import express, { Request, Response } from "express";
import { orderService } from "../services/orders.service";
import {
  IOrder,
  IOrderItem,
  OrderStatus,
} from "../models/interfaces/order.interface";
import { BaseController } from "./base/base.controller";
import { IOrderController } from "./interface/i.order.controller";
import { IOrderService } from "../services/interface/i.orders.service";
import { IProductService } from "../services/interface/i.products.service";
import { ICustomerService } from "../services/interface/i.customers.service";
import { IProduct } from "../models/interfaces/product.interface";
import { ICustomer } from "../models/interfaces/customer.interface";
import { productService } from "../services/products.service";
import { customerService } from "../services/customers.service";
import { ICartService } from "../services/interface/i.cart.service";
import { ICart } from "../models/interfaces/cart.interface";
import { cartService } from "../services/cart.service";

class OrderController
  extends BaseController<IOrder>
  implements IOrderController<IOrder>
{
  private productService: IProductService<IProduct>;
  private customerService: ICustomerService<ICustomer>;
  private cartService: ICartService<ICart>;

  constructor(
    service: IOrderService<IOrder>,
    productService: IProductService<IProduct>,
    customerService: ICustomerService<ICustomer>,
    cartService: ICartService<ICart>
  ) {
    super(service);
    this.productService = productService;
    this.customerService = customerService;
    this.cartService = cartService;
  }

  checkout = async (req: Request, res: Response): Promise<any> => {
    try {
      const { cartId } = req.params;
      const cart = await this.cartService.getById(cartId);
      if (!cart) return res.status(400).json("Not find cart");
      const order = await this.service.create({
        customerId: cart.customerId,
        items: [cart],
        totalAmount: cart.quantity * cart.price,
        status: "pending",
        isPaid: false,
      });
      if (order) await this.cartService.delete(cartId);
      return res.status(200).json(order);
    } catch (e) {
      return res.status(400);
    }
  };
   getMeOrders = async (req: Request, res: Response): Promise<any> => {
      try {
        // 1. Lấy header Authorization
        const auth = req.headers.authorization;
        if (!auth?.startsWith("Bearer ")) {
          return res.sendStatus(401);          // Thiếu token
        }
        const token = auth.slice(7);

        // 2. Lấy customer từ token
        const customer = await this.customerService.getCustomerBySessionToken(token);
        if (!customer) {
          return res.sendStatus(404);          // Token không hợp lệ
        }

        // 3. Lấy đơn hàng
        const orders = await this.service.getOrdersByCustomerId(customer._id);
        // 4. Trả về danh sách đơn hàng
        return res.status(200).json(orders);
      } catch (e) {
        console.error(e);
        return res.sendStatus(400);
    }
  };
  getOrdersByCustomerId = async (req: Request, res: Response): Promise<any> => {
    try {
      const { customerId } = req.params;
      const orders = await this.service.getOrdersByCustomerId(customerId);
      return res.status(200).json(orders);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  };
  updateOrderStatus = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await this.service.updateOrderStatus(id, status);

      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}

export const orderController = new OrderController(
  orderService,
  productService,
  customerService,
  cartService
);
