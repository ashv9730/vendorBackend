"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.customerRoutes = router;
// signup / create customer
router.post("/signup", controllers_1.customerSignUp);
// login
router.post("/login", controllers_1.customerLogin);
// authentication is need for this routes
router.use(middlewares_1.Authenticate);
// verify account
router.put("/verify-acount", controllers_1.verifyCustomer);
// OTP /REquesting OTP
router.get("/request-otp", controllers_1.customerRequestOTP);
// Profile
router.get("/profile", controllers_1.customerGetProfile);
router.put("/profile", controllers_1.updateCustomerProfile);
//# sourceMappingURL=customerRoutes.js.map