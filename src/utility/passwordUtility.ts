import { genSalt, hash } from "bcrypt";
import { AuthPayload } from "../dto";
import { sign, verify } from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { Request } from "express";

export const generateSalt = async () => {
  return await genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await hash(password, salt);
};

export const generatedPayload = async (payload: AuthPayload) => {
  return sign(payload, APP_SECRET, { expiresIn: "90d" });
};

export const validateToken = async (req: Request) => {
  const token = req.get("Authorization");
  if (token) {
    const payload = verify(token.split(" ")[1], APP_SECRET) as AuthPayload;
    req.user = payload;
    return true;
  }

  return false;
};
