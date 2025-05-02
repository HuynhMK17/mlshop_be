import { Document } from "mongoose";
import { IAuthentication } from "./authentication.interface";

export interface IBusinesses extends Document {
  name: string;
  email: string;
  authentication: IAuthentication;
  address: {
    street: string;
    city: string;
    country: string;
    detail: string;
  };
  phone: string;
  website: string;
  category: string;
  registrationNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
