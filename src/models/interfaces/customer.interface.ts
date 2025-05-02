import { Document } from "mongoose";
import { IAuthentication } from "./authentication.interface";

export interface ICustomer extends Document {
  username: string;
  email: string;
  authentication: IAuthentication;
  gender: string;
  birthday: Date;
  address: {
    street: string;
    city: string;
    country: string;
    detail: string;
  };
  wishList: string[];
  createAt: Date;
  updateAt: Date;
  // orderHistory: Order[];
}
