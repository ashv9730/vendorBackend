import { NextFunction, Request, Response } from "express";
import { CreateVendorInput, EditVendorInputs } from "../dto";
import Vendor from "../models/Vendor";
import {
  generatePassword,
  generateSalt,
  generatedPayload,
} from "../utility/passwordUtility";
import { responseMessage } from "../utility/responseMessage";
import { CreateFoodInput } from "../dto/Food.dto";
import Food from "../models/Food";
import { imagePath } from "..";

export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email });
  }
  return await Vendor.findById(id);
};

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;

  const existVendor = await findVendor(undefined, email);

  if (existVendor) {
    return responseMessage(res, 200, "Email Already register plz login");
  }

  // genertate salt
  const salt = await generateSalt();
  // generating hash passsword
  const hashPassword = await generatePassword(password, salt);
  // one is this method
  // const createVendor = new Vendor({
  const createVendor = await Vendor.create({
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password: hashPassword,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    salt,
  });

  if (!createVendor) {
    return responseMessage(res, 200, "Not create Due Some REason");
  }

  const token = await generatedPayload({
    _id: createVendor._id,
    name: createVendor.name,
    foodType: createVendor.foodType,
    email: createVendor.email,
  });
  // return res.json({message: "login successfully",token});

  // return responseMessage(res, 200, createVendor, true);
  return responseMessage(
    res,
    200,
    { message: "User created succesfully", token },
    true
  );
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (vendors.length === 0) {
    // return responseMessage("No Vendors")
    return responseMessage(res, 404, "No vendor are there");
  }

  return responseMessage(res, 200, vendors, true);
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const vendor = await findVendor(id);

  if (!vendor) {
    return responseMessage(res, 404, "vendor Not found");
  }

  return responseMessage(res, 200, vendor, true);
};

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const vendor = await findVendor(user._id);
    return responseMessage(res, 200, vendor, true);
  }

  return responseMessage(res, 404, "User Not found");
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phone, address, foodType } = <EditVendorInputs>req.body;
  const user = req.user;
  if (user) {
    const vendor = await findVendor(user._id);
    if (vendor) {
      vendor.name = name;
      vendor.phone = phone;
      vendor.address = address;
      vendor.foodType = foodType;
      const savedVendor = await vendor.save();
      return responseMessage(res, 200, savedVendor, true);
    }
  }

  return responseMessage(res, 404, "User Not found");
};

export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const vendor = await findVendor(user._id);
    if (vendor) {
      vendor.serviceAvailable = !vendor.serviceAvailable;
      const savedVendor = await vendor.save();
      return responseMessage(res, 200, savedVendor, true);
    }
  }

  return responseMessage(res, 404, "User Not found");
};

// vendor post food
export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const { name, price, readyTime, description, category, foodType } = <
      CreateFoodInput
    >req.body;
    const vendor = await findVendor(user._id);
    if (vendor) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);
      const createdFood = await Food.create({
        vendorId: vendor._id,
        name,
        price,
        readyTime,
        description,
        category,
        foodType,
        images,
        rating: 0,
      });
      if (!createFood) {
        return responseMessage(res, 200, "Food not created");
      }
      vendor.foods.push(createdFood);
      const result = await vendor.save();
      return responseMessage(res, 200, result, true);
    }
  }

  return responseMessage(res, 404, "User Not found");
};

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const foods = await Food.find();
      if (!foods) {
        return responseMessage(res, 404, "Foods Not found");
      }
      return responseMessage(res, 200, foods, true);
    }
    return responseMessage(res, 404, "User Not found");
  } catch (error) {
    return responseMessage(res, 401, error);
  }
};

// update vendor image
export const updateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const { name, price, readyTime, description, category, foodType } = <
      CreateFoodInput
    >req.body;
    const vendor = await findVendor(user._id);
    if (vendor) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      vendor.coverImages.push(...images);
      const result = await vendor.save();
      return responseMessage(res, 200, result, true);
    }
  }

  return responseMessage(res, 404, "User Not found");
};
