import { NextFunction, Request, Response } from "express";
import Vendor from "../models/Vendor";
import { responseMessage } from "../utility/responseMessage";
import { FoodDoc } from "../models/Food";
import { findVendor } from "./vendorController";

export const getFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;

  const result = await Vendor.find({ pincode, serviceAvailable: true })
    .sort({ rating: -1 })
    .populate("foods");

  if (result.length == 0) {
    return responseMessage(res, 200, "No Food Available in this pincode");
  }

  return responseMessage(res, 200, result, true);
};

export const getTopRestuarents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;

  const result = await Vendor.find({ pincode, serviceAvailable: true })
    .sort({ rating: -1 })
    .limit(10);

  if (result.length == 0) {
    return responseMessage(res, 200, "restuarents is not available");
  }

  return responseMessage(res, 200, result, true);
};

export const getFoodIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;

  const result = await Vendor.find({ pincode, serviceAvailable: true })
    .sort({ rating: -1 })
    .populate("foods");

  if (result.length == 0) {
    return responseMessage(res, 200, "No Food Available in this pincode");
  }

  const foodResult: any = [];

  result.map((vendor) => {
    const foods = vendor.foods as [FoodDoc];
    foodResult.push(...foods.filter((food) => food.readyTime <= 30));
  });

  if (foodResult.length == 0) {
    return responseMessage(res, 200, "No food in 30 mins");
  }

  return responseMessage(res, 200, foodResult, true);
};

export const searchFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pincode } = req.params;

  const result = await Vendor.find({
    pincode,
    serviceAvailable: true,
  }).populate("foods");

  if (result.length == 0) {
    return responseMessage(res, 200, "No Food Available in this pincode");
  }

  const foodResult: any = [];

  result.map((item) => {
    foodResult.push(...item.foods);
  });

  if (foodResult.length == 0) {
    return responseMessage(res, 200, "No food in 30 mins");
  }

  return responseMessage(res, 200, foodResult, true);
};

export const restuarentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const vendor = await Vendor.findById(id).populate("foods");

  if (!vendor) {
    return responseMessage(res, 404, "vendor Not found");
  }

  return responseMessage(res, 200, vendor, true);
};
