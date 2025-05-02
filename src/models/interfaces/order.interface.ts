import { Document } from "mongoose";

export interface IOrderItem extends Document {
  productId: string;
  options: string;
  size: string;
  color: string;
  material: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  customerId: string;
  items: IOrderItem[];
  totalAmount: number;
  isPaid: boolean;
  status: OrderStatus;
  orderDate: Date;
  updateDate: Date;
}

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
