import { Router } from "express";
import {
  customerGetProfile,
  customerLogin,
  customerRequestOTP,
  customerSignUp,
  updateCustomerProfile,
  verifyCustomer,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = Router();

// signup / create customer
router.post("/signup", customerSignUp);
// login
router.post("/login", customerLogin);

// authentication is need for this routes
router.use(Authenticate);
// verify account
router.put("/verify-acount", verifyCustomer);
// OTP /REquesting OTP
router.get("/request-otp", customerRequestOTP);
// Profile
router.get("/profile", customerGetProfile);

router.put("/profile", updateCustomerProfile);

// cart

// Order

// Payment

export { router as customerRoutes };
