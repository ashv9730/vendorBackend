import express from "express";
import {
  createFood,
  createVendor,
  getFoods,
  getVendorById,
  getVendorProfile,
  getVendors,
  updateVendorCoverImage,
  vendorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares";
import { images } from "../utility/multerImage";

const router = express.Router();

// create Vendor
router.post("/", createVendor);
// get All Vendor
router.get("/", getVendors);
// get Vendors by ID
router.get("/:id", getVendorById);
// vendor login
router.post("/login", vendorLogin);

// Authenticating vendor now
router.use(Authenticate);
// vendor login
// router.post("/profile", getVendorProfile)
// create Food
router.post("/food", images, createFood);

// get Food
// router.get("/foods", getFoods);

// update cover images
router.post("/coverimage", images, updateVendorCoverImage);

export { router as vendorRoutes };
