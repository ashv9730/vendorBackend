import { NextFunction, Request, Response } from "express";
import { VendorLoginInput } from "../dto";
import { findVendor } from "./vendorController";
import { compare } from "bcrypt";
import { generatedPayload } from "../utility/passwordUtility";
import jwt from "jsonwebtoken";

export const vendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInput>req.body;

  const vendor = await findVendor(undefined, email);

  if (!vendor) {
    return res.json({ message: "email not register" });
  }

  const match = await compare(password, vendor.password);

  if (!match) {
    return res.json({ message: "email or password not match" });
  }

  // console.log(jsonwebTokenSecretKey)
  const token = await generatedPayload({
    _id: vendor._id,
    name: vendor.name,
    foodType: vendor.foodType,
    email: vendor.email,
  });
  return res.json({ message: "login successfully", token });
};
