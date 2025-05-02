import express from "express";
import { customerService } from "../services/customers.service";
import { BaseController } from "./base/base.controller";
import { ICustomer } from "models/interfaces/customer.interface";
import { ICustomerController } from "./interface/i.customers.controller";
import mongoose from "mongoose";

class CustomerController
  extends BaseController<ICustomer>
  implements ICustomerController<ICustomer>
{
  constructor() {
    super(customerService);
  }

  getCustomerByEmail = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { email } = req.body;
      const cus = await this.service.getCustomerByEmail(email);
      return res.status(200).json(cus);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
  getCustomerBySessionToken = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { token } = req.body;
      const cus = await this.service.getCustomerBySessionToken(token);
      return res.status(200).json(cus);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
  putProductWishList = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { customerId, productId } = req.body;
      console.log("Received customerId:", customerId);
      console.log("Received productId:", productId);
      const cus = await this.service.putProductWishList(customerId, productId);
      return res.status(200).json(cus);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}

export const customerController = new CustomerController();
