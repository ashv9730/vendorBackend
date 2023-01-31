
import {Request, Response, NextFunction} from "express"
import { responseMessage } from "./responseMessage"
export const pageNotFound = (req:Request, res:Response, next:NextFunction) => {
    return responseMessage(res,404,"Url Not Found",false)
}