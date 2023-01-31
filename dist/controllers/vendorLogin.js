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
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorLogin = void 0;
const vendorController_1 = require("./vendorController");
const bcrypt_1 = require("bcrypt");
const passwordUtility_1 = require("../utility/passwordUtility");
const vendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const vendor = yield (0, vendorController_1.findVendor)(undefined, email);
    if (!vendor) {
        return res.json({ message: "email not register" });
    }
    const match = yield (0, bcrypt_1.compare)(password, vendor.password);
    if (!match) {
        return res.json({ message: "email or password not match" });
    }
    // console.log(jsonwebTokenSecretKey)
    const token = yield (0, passwordUtility_1.generatedPayload)({
        _id: vendor._id,
        name: vendor.name,
        foodType: vendor.foodType,
        email: vendor.email,
    });
    return res.json({ message: "login successfully", token });
});
exports.vendorLogin = vendorLogin;
//# sourceMappingURL=vendorLogin.js.map