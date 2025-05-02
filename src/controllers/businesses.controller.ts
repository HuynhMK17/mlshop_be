import express from "express";
import { BaseController } from "./base/base.controller";
import { businessesService } from "../services/businesses.service";
import { IBusinessesController } from "./interface/i.businesses.controller";
import { IBusinesses } from "../models/interfaces/businesses.interface";
import { authentication, random } from "../helpers";

class BusinessesController
  extends BaseController<IBusinesses>
  implements IBusinessesController<IBusinesses>
{
  constructor() {
    super(businessesService);
  }

  create = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const {
        email,
        password,
        name,
        phone,
        website,
        category,
        address: { street, city, country, detail },
      } = req.body;
      if (!email || !password || !name) {
        return res.sendStatus(400);
      }
      const existingCutomer = await this.service.getBusinessesByEmail(email);
      if (existingCutomer) return res.sendStatus(400);

      const salt = random();
      const customer = await this.service.create({
        email,
        name,
        authentication: {
          salt,
          password: authentication(salt, password),
        },
        phone,
        website,
        category,
        address: {
          street,
          city,
          country,
          detail,
        },
      });

      return res.status(200).json(customer).end();
    } catch (e) {
      console.log(e);
    }
  };
  getBusinessesByEmail = async (
    req: express.Request,
    res: express.Response
  ): Promise<any> => {
    try {
      const { email } = req.body;
      const cus = await this.service.getBusinessesByEmail(email);
      return res.status(200).json(cus);
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };
}

export const businessesController = new BusinessesController();
