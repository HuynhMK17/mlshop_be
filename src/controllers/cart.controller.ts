import express from "express";
import { BaseController } from "./base/base.controller";
import { cartService } from "../services/cart.service";
import { ICartController } from "./interface/i.cart.controller";
import { ICart } from "../models/interfaces/cart.interface";

class CartController
  extends BaseController<ICart>
  implements ICartController<ICart>
{
  constructor() {
    super(cartService);
  }

  async getCartByCustomerId(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const { customerId } = req.params;
      const cart = await this.service.getCartByCustomerId(customerId);
      return res.status(200).json(cart);
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }
}

export const cartController = new CartController();
