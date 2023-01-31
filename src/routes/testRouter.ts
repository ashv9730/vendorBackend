import express, { Application } from "express";
import { test1 } from "../controllers/testController";
import { getVendorProfile } from "../controllers";
import {} from "../middlewares";
import {
  getFoods,
  updateProfile,
  updateService,
  updateVendorCoverImage,
} from "../controllers/vendorController";
import { images } from "../utility/multerImage";
import { Authenticate } from "../middlewares/commonAuth";

const router = express.Router();

router.get("/", test1);
// vendor get profile
// this or like this
router.use(Authenticate);
router.get("/profile", getVendorProfile);
// update profile
router.put("/profile", updateProfile);
// update service
router.put("/service", updateService);

router.get("/foods", getFoods);
// update cover images
router.post("/coverimage", images, updateVendorCoverImage);

export { router as testRoutes };
