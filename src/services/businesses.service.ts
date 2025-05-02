import { BusinessesModel } from "../models/businesses.model";
import { IBusinesses } from "../models/interfaces/businesses.interface";
import { BaseService } from "./base/base.service";
import { IBusinessesService } from "./interface/i.businesses.service";

class BusinessesService
  extends BaseService<IBusinesses>
  implements IBusinessesService<IBusinesses>
{
  constructor() {
    super(BusinessesModel);
  }

  async getBusinessesByEmail(email: string): Promise<IBusinesses | null> {
    return this.model
      .findOne({ email })
      .select("+authentication.salt +authentication.password");
  }
}

export const businessesService = new BusinessesService();
