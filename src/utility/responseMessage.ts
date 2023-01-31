import { Response } from "express"



export const responseMessage = (res:Response, statusCode:number,  message:any, success:boolean = false) => {
    return res.status(statusCode).json({success,message})
}