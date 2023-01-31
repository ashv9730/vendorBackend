import { Request, Response } from "express";

export const test1 =async (req:Request, res: Response) => {
    return res.json({message: "okkk"})
}