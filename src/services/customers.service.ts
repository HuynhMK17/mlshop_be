import { ICustomer } from "../models/interfaces/customer.interface";
import { CustomerModel } from "../models/customer.model";
import { BaseService } from "./base/base.service";
import { ICustomerService } from "./interface/i.customers.service";

class CustomerService
  extends BaseService<ICustomer>
  implements ICustomerService<ICustomer>
{
  constructor() {
    super(CustomerModel);
  }

  async getCustomerByEmail(email: string): Promise<ICustomer | null> {
    return this.model
      .findOne({ email })
      .select("+authentication.salt +authentication.password");
  }

  async getCustomerBySessionToken(
    sessionToken: string
  ): Promise<ICustomer | null> {
    return this.model.findOne({
      "authentication.sessionToken": sessionToken,
    });
  }
  async putProductWishList(
    customerId: string,
    productId: string
  ): Promise<ICustomer> {
    const customer = await this.model.findById({ _id: customerId });
    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.wishList) {
      customer.wishList = [];
    }
    const index = customer.wishList.indexOf(productId);

    if (index !== -1) {
      customer.wishList.splice(index, 1);
    } else {
      customer.wishList.push(productId);
    }

    await customer.save();
    return customer;
  }
}

export const customerService = new CustomerService();
