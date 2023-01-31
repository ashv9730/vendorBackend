"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRoutes = void 0;
const express_1 = __importDefault(require("express"));
const testController_1 = require("../controllers/testController");
const controllers_1 = require("../controllers");
const vendorController_1 = require("../controllers/vendorController");
const multerImage_1 = require("../utility/multerImage");
const commonAuth_1 = require("../middlewares/commonAuth");
const router = express_1.default.Router();
exports.testRoutes = router;
router.get("/", testController_1.test1);
// vendor get profile
// this or like this
router.use(commonAuth_1.Authenticate);
router.get("/profile", controllers_1.getVendorProfile);
// update profile
router.put("/profile", vendorController_1.updateProfile);
// update service
router.put("/service", vendorController_1.updateService);
router.get("/foods", vendorController_1.getFoods);
// update cover images
router.post("/coverimage", multerImage_1.images, vendorController_1.updateVendorCoverImage);
//# sourceMappingURL=testRouter.js.map