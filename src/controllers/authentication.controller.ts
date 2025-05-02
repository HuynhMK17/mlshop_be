import express from "express";
import { authentication, random } from "../helpers";
import { customerService } from "../services/customers.service";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {
      email,
      password,
      username,
      gender,
      birthday,
      address: { street, city, country, detail },
    } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingCutomer = await customerService.getCustomerByEmail(email);
    if (existingCutomer) return res.sendStatus(400);

    const salt = random();
    const customer = await customerService.create({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      gender,
      birthday,
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

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const customer = await customerService.getCustomerByEmail(email);

    if (!customer) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const expectedHash = authentication(
      customer.authentication.salt,
      password
    ).toString();

    const customerPassword = customer.authentication.password.toString();

    if (customerPassword !== expectedHash) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const salt = random();
    customer.authentication.sessionToken = authentication(
      salt,
      customer._id.toString()
    ).toString();

    await customer.save();

    res.cookie("ANTONIO-AUTH", customer.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: customer._id,
        email: customer.email,
        name: customer.username,
        authentication: customer.authentication,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "An error occurred during login",
    });
  }
};
