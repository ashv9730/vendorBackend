"use strict";
// email
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
exports.sendOtp = exports.generateOtp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const config_1 = require("../config");
// notification
// otp
const generateOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
});
exports.generateOtp = generateOtp;
// send Otp to customer
const sendOtp = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, twilio_1.default)(config_1.accountSid, config_1.twilioAuthToken);
    const responseMessage = client.messages.create({
        body: `your otp is ${otp}`,
        from: "+15139867792",
        to: `+91${toPhoneNumber}`,
    });
    return responseMessage;
});
exports.sendOtp = sendOtp;
// payment notification or email
//# sourceMappingURL=NotificationUtility.js.map