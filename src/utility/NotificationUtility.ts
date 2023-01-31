// email

import twilio from "twilio";
import { accountSid, twilioAuthToken } from "../config";

// notification

// otp
export const generateOtp = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

// send Otp to customer
export const sendOtp = async (otp: number, toPhoneNumber: string) => {
  const client = twilio(accountSid, twilioAuthToken);

  const responseMessage = client.messages.create({
    body: `your otp is ${otp}`,
    from: "+15139867792",
    to: `+91${toPhoneNumber}`,
  });

  return responseMessage;
};

// payment notification or email
