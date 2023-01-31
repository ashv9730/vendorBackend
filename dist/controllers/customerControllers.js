"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerProfile = exports.customerGetProfile = exports.customerRequestOTP = exports.verifyCustomer = exports.customerLogin = exports.customerSignUp = void 0;
const class_transformer_1 = require("class-transformer");
const Customer_dto_1 = require("../dto/Customer.dto");
const class_validator_1 = require("class-validator");
const responseMessage_1 = require("../utility/responseMessage");
const passwordUtility_1 = require("../utility/passwordUtility");
const Customer_1 = __importDefault(require("../models/Customer"));
const NotificationUtility_1 = require("../utility/NotificationUtility");
const bcrypt_1 = require("bcrypt");
const customerSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.CreateCustomerInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs, {
        validationError: { target: true },
    });
    if (inputErrors.length > 0) {
        return (0, responseMessage_1.responseMessage)(res, 401, inputErrors);
    }
    const { email, phone, password } = customerInputs;
    const existingCustomer = yield Customer_1.default.findOne({ email });
    if (existingCustomer) {
        return (0, responseMessage_1.responseMessage)(res, 200, "Customer already exist So plz login");
    }
    const salt = yield (0, passwordUtility_1.generateSalt)();
    const hashPassword = yield (0, passwordUtility_1.generatePassword)(password, salt);
    const { otp, expiry } = yield (0, NotificationUtility_1.generateOtp)();
    const createdCustomer = yield Customer_1.default.create({
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
        return (0, responseMessage_1.responseMessage)(res, 401, "Customer Not Created");
    }
    // if created then
    // send Otp to customer
    yield (0, NotificationUtility_1.sendOtp)(otp, phone);
    // geneerate token
    const token = yield (0, passwordUtility_1.generatedPayload)({
        _id: createdCustomer._id,
        email: createdCustomer.email,
        verified: createdCustomer.verified,
    });
    // send token to client
    return (0, responseMessage_1.responseMessage)(res, 201, token, true);
});
exports.customerSignUp = customerSignUp;
const customerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.CustomerLoginInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs, {
        validationError: { target: true },
    });
    if (inputErrors.length > 0) {
        return (0, responseMessage_1.responseMessage)(res, 401, inputErrors);
    }
    const { email, password } = customerInputs;
    const customer = yield Customer_1.default.findOne({ email });
    if (!customer) {
        return res.json({ message: "email not register" });
    }
    const match = yield (0, bcrypt_1.compare)(password, customer.password);
    if (!match) {
        return res.json({ message: "email or password not match" });
    }
    // console.log(jsonwebTokenSecretKey)
    const token = yield (0, passwordUtility_1.generatedPayload)({
        _id: customer._id,
        email: customer.email,
        verified: customer.verified,
    });
    return (0, responseMessage_1.responseMessage)(res, 200, { message: "login successfully", token }, true);
});
exports.customerLogin = customerLogin;
const verifyCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const existingCustomer = yield Customer_1.default.findById(customer._id);
        if (!existingCustomer) {
            return (0, responseMessage_1.responseMessage)(res, 404, " Not existing Customer found");
        }
        // matching otp and otp expirying time
        if (existingCustomer.otp === parseInt(otp) &&
            existingCustomer.otp_expiry >= new Date()) {
            existingCustomer.verified = true;
            const updateCustomerProfile = yield existingCustomer.save();
            // sendinig updated token geneerate token
            const token = yield (0, passwordUtility_1.generatedPayload)({
                _id: updateCustomerProfile._id,
                email: updateCustomerProfile.email,
                verified: updateCustomerProfile.verified,
            });
            return (0, responseMessage_1.responseMessage)(res, 201, token, true);
        }
    }
    return (0, responseMessage_1.responseMessage)(res, 404, "Error with otp validation");
});
exports.verifyCustomer = verifyCustomer;
const customerRequestOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const existingCustomerProfile = yield Customer_1.default.findById(customer._id);
        if (!existingCustomerProfile) {
            return (0, responseMessage_1.responseMessage)(res, 200, "Customer Data Not Match ");
        }
        // generated otp
        const { otp, expiry } = yield (0, NotificationUtility_1.generateOtp)();
        // update otp in customer database
        existingCustomerProfile.otp = otp;
        existingCustomerProfile.otp_expiry = expiry;
        // saved update customer
        const updatedCustomerProfile = yield existingCustomerProfile.save();
        // send otp to client
        yield (0, NotificationUtility_1.sendOtp)(otp, updatedCustomerProfile.phone);
        return (0, responseMessage_1.responseMessage)(res, 200, {
            message: "OTP Send Successfully on your registerd Mobile No",
        });
    }
    return (0, responseMessage_1.responseMessage)(res, 200, "Customer Data Not Found ");
});
exports.customerRequestOTP = customerRequestOTP;
const customerGetProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const existingCustomerProfile = yield Customer_1.default.findById(customer._id);
        return (0, responseMessage_1.responseMessage)(res, 200, existingCustomerProfile, true);
    }
    return (0, responseMessage_1.responseMessage)(res, 200, "Customer Data Not Found ");
});
exports.customerGetProfile = customerGetProfile;
const updateCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const { firstName, lastName, address } = (req.body);
        const existingCustomerProfile = yield Customer_1.default.findById(customer._id);
        if (!existingCustomerProfile) {
            return (0, responseMessage_1.responseMessage)(res, 200, "Customer Data Not Match ");
        }
        existingCustomerProfile.firstName = firstName;
        existingCustomerProfile.lastName = lastName;
        existingCustomerProfile.address = address;
        const updatedCustomerProfile = yield existingCustomerProfile.save();
        return (0, responseMessage_1.responseMessage)(res, 200, updatedCustomerProfile, true);
    }
    return (0, responseMessage_1.responseMessage)(res, 200, "Customer Data Not Found ");
});
exports.updateCustomerProfile = updateCustomerProfile;
//# sourceMappingURL=customerControllers.js.map