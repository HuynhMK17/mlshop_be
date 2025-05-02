import { Document } from "mongoose";

export interface IAuthentication extends Document {
  password: string;
  salt: string;
  sessionToken: string;
  role: AuthenRole;
}
export type AuthenRole = "businesses" | "customer" | "staff";
