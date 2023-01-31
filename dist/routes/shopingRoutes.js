"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopingRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.shopingRouter = router;
// find availability
router.get("/:pincode", controllers_1.getFoodAvailability);
// Top restuarents
router.get("/top-restuarents/:pincode", controllers_1.getTopRestuarents);
// food avialable in 30 minutes
router.get("/foods-in-30-min/:pincode", controllers_1.getFoodIn30Min);
// search foods
router.get("/serach/:pincode", controllers_1.searchFood);
// find restuarents by Id
router.get("/restuarent/:id", controllers_1.restuarentById);
//# sourceMappingURL=shopingRoutes.js.map