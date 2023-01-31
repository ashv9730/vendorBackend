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
exports.updateVendorCoverImage = exports.getFoods = exports.createFood = exports.updateService = exports.updateProfile = exports.getVendorProfile = exports.getVendorById = exports.getVendors = exports.createVendor = exports.findVendor = void 0;
const Vendor_1 = __importDefault(require("../models/Vendor"));
const passwordUtility_1 = require("../utility/passwordUtility");
const responseMessage_1 = require("../utility/responseMessage");
const Food_1 = __importDefault(require("../models/Food"));
const findVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield Vendor_1.default.findOne({ email });
    }
    return yield Vendor_1.default.findById(id);
});
exports.findVendor = findVendor;
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, foodType, pincode, address, phone, email, password, } = req.body;
    const existVendor = yield (0, exports.findVendor)(undefined, email);
    if (existVendor) {
        return (0, responseMessage_1.responseMessage)(res, 200, "Email Already register plz login");
    }
    // genertate salt
    const salt = yield (0, passwordUtility_1.generateSalt)();
    // generating hash passsword
    const hashPassword = yield (0, passwordUtility_1.generatePassword)(password, salt);
    // one is this method
    // const createVendor = new Vendor({
    const createVendor = yield Vendor_1.default.create({
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
        return (0, responseMessage_1.responseMessage)(res, 200, "Not create Due Some REason");
    }
    const token = yield (0, passwordUtility_1.generatedPayload)({
        _id: createVendor._id,
        name: createVendor.name,
        foodType: createVendor.foodType,
        email: createVendor.email,
    });
    // return res.json({message: "login successfully",token});
    // return responseMessage(res, 200, createVendor, true);
    return (0, responseMessage_1.responseMessage)(res, 200, { message: "User created succesfully", token }, true);
});
exports.createVendor = createVendor;
const getVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield Vendor_1.default.find();
    if (vendors.length === 0) {
        // return responseMessage("No Vendors")
        return (0, responseMessage_1.responseMessage)(res, 404, "No vendor are there");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, vendors, true);
});
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield (0, exports.findVendor)(id);
    if (!vendor) {
        return (0, responseMessage_1.responseMessage)(res, 404, "vendor Not found");
    }
    return (0, responseMessage_1.responseMessage)(res, 200, vendor, true);
});
exports.getVendorById = getVendorById;
const getVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield (0, exports.findVendor)(user._id);
        return (0, responseMessage_1.responseMessage)(res, 200, vendor, true);
    }
    return (0, responseMessage_1.responseMessage)(res, 404, "User Not found");
});
exports.getVendorProfile = getVendorProfile;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, address, foodType } = req.body;
    const user = req.user;
    if (user) {
        const vendor = yield (0, exports.findVendor)(user._id);
        if (vendor) {
            vendor.name = name;
            vendor.phone = phone;
            vendor.address = address;
            vendor.foodType = foodType;
            const savedVendor = yield vendor.save();
            return (0, responseMessage_1.responseMessage)(res, 200, savedVendor, true);
        }
    }
    return (0, responseMessage_1.responseMessage)(res, 404, "User Not found");
});
exports.updateProfile = updateProfile;
const updateService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield (0, exports.findVendor)(user._id);
        if (vendor) {
            vendor.serviceAvailable = !vendor.serviceAvailable;
            const savedVendor = yield vendor.save();
            return (0, responseMessage_1.responseMessage)(res, 200, savedVendor, true);
        }
    }
    return (0, responseMessage_1.responseMessage)(res, 404, "User Not found");
});
exports.updateService = updateService;
// vendor post food
const createFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, price, readyTime, description, category, foodType } = req.body;
        const vendor = yield (0, exports.findVendor)(user._id);
        if (vendor) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            const createdFood = yield Food_1.default.create({
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
            if (!exports.createFood) {
                return (0, responseMessage_1.responseMessage)(res, 200, "Food not created");
            }
            vendor.foods.push(createdFood);
            const result = yield vendor.save();
            return (0, responseMessage_1.responseMessage)(res, 200, result, true);
        }
    }
    return (0, responseMessage_1.responseMessage)(res, 404, "User Not found");
});
exports.createFood = createFood;
const getFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user) {
            const foods = yield Food_1.default.find();
            if (!foods) {
                return (0, responseMessage_1.responseMessage)(res, 404, "Foods Not found");
            }
            return (0, responseMessage_1.responseMessage)(res, 200, foods, true);
        }
        return (0, responseMessage_1.responseMessage)(res, 404, "User Not found");
    }
    catch (error) {
        return (0, responseMessage_1.responseMessage)(res, 401, error);
    }
});
exports.getFoods = getFoods;
// update vendor image
const updateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, price, readyTime, description, category, foodType } = req.body;
        const vendor = yield (0, exports.findVendor)(user._id);
        if (vendor) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            vendor.coverImages.push(...images);
            const result = yield vendor.save();
            return (0, responseMessage_1.responseMessage)(res, 200, result, true);
        }
    }
    return (0, responseMessage_1.responseMessage)(res, 404, "User Not found");
});
exports.updateVendorCoverImage = updateVendorCoverImage;
//# sourceMappingURL=vendorController.js.map