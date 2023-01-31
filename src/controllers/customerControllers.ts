import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import {
  CreateCustomerInputs,
  CustomerLoginInputs,
  EditCustomerProfileIneputs,
  // EditCustomerProfileInputs,
} from "../dto/Customer.dto";
import { validate } from "class-validator";
import { responseMessage } from "../utility/responseMessage";
import {
  generatePassword,
  generateSalt,
  generatedPayload,
} from "../utility/passwordUtility";
import Customer from "../models/Customer";
import { generateOtp, sendOtp } from "../utility/NotificationUtility";
import { compare } from "bcrypt";

export const customerSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(CreateCustomerInputs, req.body);

  const inputErrors = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (inputErrors.length > 0) {
    return responseMessage(res, 401, inputErrors);
  }

  const { email, phone, password } = customerInputs;

  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    return responseMessage(res, 200, "Customer already exist So plz login");
  }

  const salt = await generateSalt();
  const hashPassword = await generatePassword(password, salt);

  const { otp, expiry } = await generateOtp();

  const createdCustomer = await Customer.create({
    email,
    password: hashPassword,
    phone,
    salt,
    otp: otp,
    otp_expiry: expiry,
    firstName: "Aakash",
    lastName: "Vishwakarma",
    address: "Alandi",
    verified: false,
    lat: 0,
    lng: 0,
  });
  // if customer not created
  if (!createdCustomer) {
    return responseMessage(res, 401, "Customer Not Created");
  }
  // if created then

  // send Otp to customer
  await sendOtp(otp, phone);

  // geneerate token
  const token = await generatedPayload({
    _id: createdCustomer._id,
    email: createdCustomer.email,
    verified: createdCustomer.verified,
  });

  // send token to client

  return responseMessage(res, 201, token, true);
};

export const customerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(CustomerLoginInputs, req.body);

  const inputErrors = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (inputErrors.length > 0) {
    return responseMessage(res, 401, inputErrors);
  }

  const { email, password } = customerInputs;

  const customer = await Customer.findOne({ email });

  if (!customer) {
    return res.json({ message: "email not register" });
  }

  const match = await compare(password, customer.password);

  if (!match) {
    return res.json({ message: "email or password not match" });
  }

  // console.log(jsonwebTokenSecretKey)
  const token = await generatedPayload({
    _id: customer._id,
    email: customer.email,
    verified: customer.verified,
  });
  return responseMessage(
    res,
    200,
    { message: "login successfully", token },
    true
  );
};

export const verifyCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp } = req.body;
  const customer = req.user;

  if (customer) {
    const existingCustomer = await Customer.findById(customer._id);

    if (!existingCustomer) {
      return responseMessage(res, 404, " Not existing Customer found");
    }

    // matching otp and otp expirying time
    if (
      existingCustomer.otp === parseInt(otp) &&
      existingCustomer.otp_expiry >= new Date()
    ) {
      existingCustomer.verified = true;

      const updateCustomerProfile = await existingCustomer.save();

      // sendinig updated token geneerate token
      const token = await generatedPayload({
        _id: updateCustomerProfile._id,
        email: updateCustomerProfile.email,
        verified: updateCustomerProfile.verified,
      });
      return responseMessage(res, 201, token, true);
    }
  }

  return responseMessage(res, 404, "Error with otp validation");
};

export const customerRequestOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const existingCustomerProfile = await Customer.findById(customer._id);

    if (!existingCustomerProfile) {
      return responseMessage(res, 200, "Customer Data Not Match ");
    }

    // generated otp
    const { otp, expiry } = await generateOtp();

    // update otp in customer database
    existingCustomerProfile.otp = otp;
    existingCustomerProfile.otp_expiry = expiry;

    // saved update customer
    const updatedCustomerProfile = await existingCustomerProfile.save();

    // send otp to client
    await sendOtp(otp, updatedCustomerProfile.phone);

    return responseMessage(res, 200, {
      message: "OTP Send Successfully on your registerd Mobile No",
    });
  }

  return responseMessage(res, 200, "Customer Data Not Found ");
};

export const customerGetProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const existingCustomerProfile = await Customer.findById(customer._id);
    return responseMessage(res, 200, existingCustomerProfile, true);
  }

  return responseMessage(res, 200, "Customer Data Not Found ");
};

export const updateCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const { firstName, lastName, address } = <EditCustomerProfileIneputs>(
      req.body
    );

    const existingCustomerProfile = await Customer.findById(customer._id);
    if (!existingCustomerProfile) {
      return responseMessage(res, 200, "Customer Data Not Match ");
    }
    existingCustomerProfile.firstName = firstName;
    existingCustomerProfile.lastName = lastName;
    existingCustomerProfile.address = address;
    const updatedCustomerProfile = await existingCustomerProfile.save();
    return responseMessage(res, 200, updatedCustomerProfile, true);
  }

  return responseMessage(res, 200, "Customer Data Not Found ");
};
