"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const multerImage_1 = require("../utility/multerImage");
const router = express_1.default.Router();
exports.vendorRoutes = router;
// create Vendor
router.post("/", controllers_1.createVendor);
// get All Vendor
router.get("/", controllers_1.getVendors);
// get Vendors by ID
router.get("/:id", controllers_1.getVendorById);
// vendor login
router.post("/login", controllers_1.vendorLogin);
// Authenticating vendor now
router.use(middlewares_1.Authenticate);
// vendor login
// router.post("/profile", getVendorProfile)
// create Food
router.post("/food", multerImage_1.images, controllers_1.createFood);
// get Food
// router.get("/foods", getFoods);
// update cover images
router.post("/coverimage", multerImage_1.images, controllers_1.updateVendorCoverImage);
//# sourceMappingURL=vendorRoutes.js.map