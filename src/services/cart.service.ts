import { CartModel } from "../models/cart.model";
import { ICart } from "../models/interfaces/cart.interface";
import { BaseService } from "./base/base.service";
import { ICartService } from "./interface/i.cart.service";

class CartService extends BaseService<ICart> implements ICartService<ICart> {
  constructor() {
    super(CartModel);
  }

  async getCartByCustomerId(customerId: string): Promise<ICart | null> {
    return this.model.find({ customerId: customerId });
  }
}

export const cartService = new CartService();
