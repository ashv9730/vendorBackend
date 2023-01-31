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
exports.restuarentById = exports.searchFood = exports.getFoodIn30Min = exports.getTopRestuarents = exports.getFoodAvailability = void 0;
const Vendor_1 = __importDefault(require("../models/Vendor"));
const responseMessage_1 = require("../utility/responseMessage");
const getFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield Vendor_1.default.find({ pincode, serviceAvailable: true })
        .sort({ rating: -1 })
        .populate("foods");
    if (result.length == 0) {
        return (0, responseMessage_1.responseMessage)(res, 200, "No Food Available in this pincode");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, result, true);
});
exports.getFoodAvailability = getFoodAvailability;
const getTopRestuarents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield Vendor_1.default.find({ pincode, serviceAvailable: true })
        .sort({ rating: -1 })
        .limit(10);
    if (result.length == 0) {
        return (0, responseMessage_1.responseMessage)(res, 200, "restuarents is not available");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, result, true);
});
exports.getTopRestuarents = getTopRestuarents;
const getFoodIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield Vendor_1.default.find({ pincode, serviceAvailable: true })
        .sort({ rating: -1 })
        .populate("foods");
    if (result.length == 0) {
        return (0, responseMessage_1.responseMessage)(res, 200, "No Food Available in this pincode");
    }
    const foodResult = [];
    result.map((vendor) => {
        const foods = vendor.foods;
        foodResult.push(...foods.filter((food) => food.readyTime <= 30));
    });
    if (foodResult.length == 0) {
        return (0, responseMessage_1.responseMessage)(res, 200, "No food in 30 mins");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, foodResult, true);
});
exports.getFoodIn30Min = getFoodIn30Min;
const searchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield Vendor_1.default.find({
        pincode,
        serviceAvailable: true,
    }).populate("foods");
    if (result.length == 0) {
        return (0, responseMessage_1.responseMessage)(res, 200, "No Food Available in this pincode");
    }
    const foodResult = [];
    result.map((item) => {
        foodResult.push(...item.foods);
    });
    if (foodResult.length == 0) {
        return (0, responseMessage_1.responseMessage)(res, 200, "No food in 30 mins");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, foodResult, true);
});
exports.searchFood = searchFood;
const restuarentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield Vendor_1.default.findById(id).populate("foods");
    if (!vendor) {
        return (0, responseMessage_1.responseMessage)(res, 404, "vendor Not found");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, vendor, true);
});
exports.restuarentById = restuarentById;
//# sourceMappingURL=shopingController.js.map