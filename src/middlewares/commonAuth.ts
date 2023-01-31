import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto";
import { validateToken } from "../utility/passwordUtility";
import { responseMessage } from "../utility/responseMessage";
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

// can we use for both customer and vendor

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req)
  const signature = await validateToken(req);
  if (signature) {
    // console.log( "message: User authorised")
    return next();
  } else {
    return responseMessage(res, 401, "User Not Authorised");
  }
};
